import { Component, EventEmitter, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../services/http/data.service';
import { MaterialModel } from '../../domain/material.interface';
import { MaterialItemDetailsComponent } from '../material-item-details/material-item-details.component';

@Component({
  selector: 'app-material-list',
  standalone: true,
  templateUrl: './material-list.component.html',
  styleUrl: './material-list.component.scss',
  imports: [CommonModule, MaterialItemDetailsComponent],
})
export class MaterialListComponent {
  @Output() materialItemSelected: EventEmitter<MaterialModel> = new EventEmitter<MaterialModel>();

  private dataService = inject(DataService);
  selectedMaterialItem: MaterialModel | null = null;

  materials = this.dataService.materials;

  selectedMaterial(material: MaterialModel): void {
    console.log(material);
    this.selectedMaterialItem = material;
    this.materialItemSelected.emit();
  }

  bookMaterial(event: Event, material: MaterialModel): void {
    event.stopPropagation();
    console.log('click on book');
    console.log(material.DescTxt);
  }
}
