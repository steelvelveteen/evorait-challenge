import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../services/data.service';
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
export class MaterialItemDetailsComponent implements OnInit {
  private dataService = inject(DataService);
  private router = inject(Router);

  material!: Material;

  ngOnInit(): void {
    this.dataService.getStoredSelectedMaterial();

    this.material = this.dataService.selectedMaterial;
  }

  bookMaterial(quantity: string, material: Material | null): void {
    // Prevents user to book quantity greater than what's available
    if (!quantity) {
      // Display some warning
      return;
    }

    const isAvailable = this.dataService.checkAvailability(quantity, material as Material);

    // Book material
    if (isAvailable) {
      this.dataService.bookMaterial(material as Material, quantity);
    }
  }

  returnToMaterialsPage(): void {
    this.router.navigate(['materials']);
  }

  nextMaterial(): void {
    this.dataService.getNextMaterial();
    this.dataService.getStoredSelectedMaterial();
    this.material = this.dataService.selectedMaterial;
  }

  previousMaterial(): void {
    this.dataService.getPreviousMaterial();
    this.dataService.getStoredSelectedMaterial();
    this.material = this.dataService.selectedMaterial;
  }
}
