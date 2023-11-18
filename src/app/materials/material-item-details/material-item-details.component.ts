import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../services/http/data.service';
import { Router } from '@angular/router';
import { MaterialModule } from '../../material.module';

@Component({
  selector: 'app-material-item-details',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './material-item-details.component.html',
  styleUrl: './material-item-details.component.scss',
})
export class MaterialItemDetailsComponent {
  private dataService = inject(DataService);
  private router = inject(Router);

  selectedMaterial = this.dataService.selectedMaterial;

  returnToMaterialsPage(): void {
    this.router.navigate(['materials']);
  }
}
