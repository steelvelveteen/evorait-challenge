import { Component, ElementRef, Input, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../services/data.service';
import { Material } from '../../domain/material.interface';
import { Router } from '@angular/router';
import { MaterialModule } from '../../material.module';

@Component({
  selector: 'app-material-item',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './material-item.component.html',
  styleUrl: './material-item.component.scss',
})
export class MaterialItemComponent {
  private dataService = inject(DataService);
  private router = inject(Router);

  @Input()
  material!: Material;
  @ViewChild('quantityInputRef') quantityInputRef: ElementRef | undefined;

  /**
   * Emits the material selected for displaying its details
   * @param materialItem the selected item from the list
   */
  selectMaterial(material: Material): void {
    this.dataService.selectMaterial(material);
    this.router.navigate(['details']);
  }
  /**
   * Prevents user from entering non-numerical values
   * @param event the event coming from book input
   */
  handleBookInputChange(event: Event): void {
    const inputValue = (event.target as HTMLInputElement).value.trim();
    if (/^\d+$/.test(inputValue)) {
    } else {
      if (this.quantityInputRef) {
        this.quantityInputRef.nativeElement.value = '';
      }
    }
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
  }
}
