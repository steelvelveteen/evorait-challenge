import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../services/http/data.service';
import { Router } from '@angular/router';
import { MaterialModule } from '../../material.module';

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

  returnToMaterialsPage(): void {
    this.router.navigate(['materials']);
  }
}
