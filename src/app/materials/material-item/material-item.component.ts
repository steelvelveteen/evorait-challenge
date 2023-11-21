import { AfterViewInit, Component, ElementRef, Input, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../services/data.service';
import { Material } from '../../domain/material.interface';
import { Router } from '@angular/router';
import { MaterialModule } from '../../material.module';
import { fromEvent, map } from 'rxjs';

@Component({
  selector: 'app-material-item',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './material-item.component.html',
  styleUrl: './material-item.component.scss',
})
export class MaterialItemComponent implements AfterViewInit {
  private dataService = inject(DataService);
  private router = inject(Router);

  isBookBtnDisabled = false;

  @Input() material!: Material;
  @ViewChild('quantityInputRef') quantityInputRef: ElementRef | undefined;

  ngAfterViewInit(): void {
    this.quantityInputRef?.nativeElement.focus();

    // Listens for quantity inputs for availablity
    // Disables button and displays error message
    fromEvent(this.quantityInputRef?.nativeElement, 'input')
      .pipe(
        map((event: any) => {
          const inputValue = (event.target as HTMLInputElement).value.trim();

          // Check if the input value is empty
          const isInputEmpty = inputValue === '';

          // Handle backspace explicitly
          // This block proudly provided by chatGPT
          if (event.inputType === 'deleteContentBackward' && isInputEmpty) {
            this.isBookBtnDisabled = false;
            return inputValue;
          }

          // Prevents user from entering non-numerical values
          if (!/^\d+$/.test(inputValue) && this.quantityInputRef) {
            this.quantityInputRef.nativeElement.value = '';
          }

          return inputValue;
        })
      )
      .subscribe(quantity => {
        // Explicitly check if the input value is not empty
        if (quantity !== '') {
          this.isBookBtnDisabled = !this.dataService.checkAvailability(quantity, this.material);
        }
      });
  }

  /**
   * Selects the material for displaying its details
   * @param materialItem the selected item from the list
   * @returns void
   */
  viewDetails(material: Material): void {
    this.dataService.selectMaterial(material);
    this.router.navigate(['details']);
  }

  /**
   * Checks for availability
   * Performs the booking in service
   * Resets the input field
   * @param quantity number of items to book
   * @param material the material user wants to book
   */
  bookMaterial(quantity: string, material: Material): void {
    const isAvailable = this.dataService.checkAvailability(quantity, material);

    // Book material
    if (isAvailable) {
      this.dataService.bookMaterial(material, quantity);
    }

    // Reset input field after booking
    if (this.quantityInputRef) {
      this.quantityInputRef.nativeElement.value = '';
    }
  }
}
