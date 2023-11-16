import { Component, EventEmitter, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../services/http/data.service';
import { MaterialModel } from '../../domain/material.interface';

@Component({
  selector: 'app-material-list',
  standalone: true,
  templateUrl: './material-list.component.html',
  styleUrl: './material-list.component.scss',
  imports: [CommonModule],
})
export class MaterialListComponent {
  private dataService = inject(DataService);
  materials = this.dataService.materials;

  @Output() materialItemSelected: EventEmitter<MaterialModel> = new EventEmitter<MaterialModel>();

  selectedMaterial(materialItem: MaterialModel): void {
    this.materialItemSelected.emit(materialItem);
  }

  bookItem(event: Event, material: MaterialModel): void {
    event.stopPropagation();
    console.log('clicking on booking item');
    console.log(material.DescTxt);
  }
}
