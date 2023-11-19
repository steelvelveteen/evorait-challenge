import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../services/http/data.service';
import { Router } from '@angular/router';
import { MaterialModule } from '../../material.module';
import { Material } from '../../domain/material.interface';

@Component({
  selector: 'app-material-item-details',
  standalone: true,
  templateUrl: './material-item-details.component.html',
  styleUrl: './material-item-details.component.scss',
  imports: [CommonModule, MaterialModule],
})
export class MaterialItemDetailsComponent {
  private dataService = inject(DataService);
  private router = inject(Router);

  selectedMaterial = this.dataService.selectedMaterial;

  constructor() {
    this.dataService.getSelectedMaterial();
  }

  bookMaterial(event: Event, quantity: string, material: Material | null): void {
    event.stopPropagation();
    // Prevents user to book without entering quantity
    if (!material || !quantity) return;

    // Prevents user to book quantity greater than what's available
    if (quantity > material.Available) return;

    // Book material
    this.dataService.bookMaterial(material, quantity);
  }

  returnToMaterialsPage(): void {
    this.router.navigate(['materials']);
  }
}
