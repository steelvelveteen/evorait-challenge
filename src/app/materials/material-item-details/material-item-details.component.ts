import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  inject,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../services/data.service';
import { Router } from '@angular/router';
import { MaterialModule } from '../../material.module';
import { Material } from '../../domain/material.interface';
import { fromEvent, map } from 'rxjs';

@Component({
  selector: 'app-material-item-details',
  standalone: true,
  templateUrl: './material-item-details.component.html',
  styleUrl: './material-item-details.component.scss',
  imports: [CommonModule, MaterialModule],
})
export class MaterialItemDetailsComponent implements OnInit, AfterViewInit {
  private dataService = inject(DataService);
  private router = inject(Router);

  material = signal<Material | undefined>(undefined);
  isBookBtnDisabled = signal(false);

  @ViewChild('quantityInputRef') quantityInputRef: ElementRef | undefined;

  ngOnInit(): void {
    this.dataService.getStoredSelectedMaterial();
    this.material.set(this.dataService.selectedMaterial);
  }

  ngAfterViewInit(): void {
    this.quantityInputRef?.nativeElement.focus();

    // Listens for quantity inputs for availablity
    // Disables button and displays error message
    fromEvent<InputEvent>(this.quantityInputRef?.nativeElement, 'input')
      .pipe(
        map((event: InputEvent) => {
          const inputValue = (event.target as HTMLInputElement).value.trim();

          // Check if the input value is empty
          const isInputEmpty = inputValue === '';

          // Handle backspace explicitly
          if (event.inputType === 'deleteContentBackward' && isInputEmpty) {
            this.isBookBtnDisabled.set(false);
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
          this.isBookBtnDisabled.set(
            !this.dataService.checkAvailability(quantity, this.material() as Material)
          );
        }
      });
  }

  bookMaterial(quantity: string, material: Material | undefined): void {
    const isAvailable = this.dataService.checkAvailability(quantity, material as Material);

    // Book material
    if (isAvailable) {
      this.dataService.bookMaterial(material, quantity);
    }

    // Reset the input field after booking
    if (this.quantityInputRef) {
      this.quantityInputRef.nativeElement.value = '';
    }
  }

  returnToMaterialsPage(): void {
    this.router.navigate(['materials']);
  }

  nextMaterial(): void {
    this.dataService.adjustIndexAndMaterial(1);
    this.material.set(this.dataService.selectedMaterial);
  }

  previousMaterial(): void {
    this.dataService.adjustIndexAndMaterial(-1);
    this.material.set(this.dataService.selectedMaterial);
  }
}
