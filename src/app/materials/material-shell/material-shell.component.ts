import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../services/http/data.service';
import { MaterialListComponent } from '../material-list/material-list.component';
import { MaterialItemDetailsComponent } from '../material-item-details/material-item-details.component';
import { MaterialModel } from '../../domain/material.interface';

@Component({
  selector: 'app-material-shell',
  standalone: true,
  templateUrl: './material-shell.component.html',
  styleUrl: './material-shell.component.scss',
  imports: [CommonModule, MaterialListComponent, MaterialItemDetailsComponent],
})
export class MaterialShellComponent {
  private dataService = inject(DataService);

  materials = this.dataService.materials;
  materialItem!: MaterialModel;

  displayMaterialItemDetails(materialItem: MaterialModel): void {
    this.materialItem = materialItem;
  }
}
