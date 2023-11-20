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

  @Input()
  material!: Material;
  @ViewChild('quantityInputRef') quantityInputRef: ElementRef | undefined;
  isBookBtnDisabled = false;

  ngAfterViewInit(): void {
    // Listens for quantity inputs for availablity
    // Disables button and displays error message
    fromEvent(this.quantityInputRef?.nativeElement, 'input')
      .pipe(
        map((event: any) => {
          const inputValue = (event.target as HTMLInputElement).value.trim();
          // Prevents user from entering non-numerical values
          if (/^\d+$/.test(inputValue)) {
          } else {
            if (this.quantityInputRef) {
              this.quantityInputRef.nativeElement.value = '';
            }
          }
          return inputValue;
        })
      )
      .subscribe(quantity => {
        this.isBookBtnDisabled = !this.dataService.checkAvailability(quantity, this.material);
      });
  }
  /**
   * Emits the material selected for displaying its details
   * @param materialItem the selected item from the list
   */
  selectMaterial(material: Material): void {
    this.dataService.selectMaterial(material);
    this.router.navigate(['details']);
  }

  bookMaterial(quantity: string, material: Material): void {
    if (!quantity) {
      // Display some warning
      return;
    }
    const isAvailable = this.dataService.checkAvailability(quantity, material);
    if (isAvailable) {
      this.dataService.bookMaterial(material, quantity);
    }
    if (this.quantityInputRef) {
      this.quantityInputRef.nativeElement.value = '';
    }
  }
}
