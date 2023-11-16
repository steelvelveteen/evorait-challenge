import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Output,
  ViewChild,
  computed,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../services/http/data.service';
import { MaterialModel } from '../../domain/material.interface';
import { distinctUntilChanged, fromEvent, map } from 'rxjs';
import { MaterialModule } from '../../material.module';
import { StorageService } from '../../services/storage/storage.service';

@Component({
  selector: 'app-material-list',
  standalone: true,
  templateUrl: './material-list.component.html',
  styleUrl: './material-list.component.scss',
  imports: [CommonModule, MaterialModule],
})
export class MaterialListComponent implements AfterViewInit {
  private dataService = inject(DataService);
  private storageService = inject(StorageService);
  materials = this.dataService.materials;
  filteredMaterials = this.dataService.materials;

  @Output() selectedMaterial: EventEmitter<MaterialModel> = new EventEmitter<MaterialModel>();
  @ViewChild('filterInputRef') filterInputRef: ElementRef | undefined;
  @ViewChild('quantityInputRef') quantityInputRef: ElementRef | undefined;

  ngAfterViewInit(): void {
    this.storageService.saveToLocalStorage(this.materials());
    this.filterInputRef?.nativeElement.focus();
    fromEvent(this.filterInputRef?.nativeElement, 'keyup')
      .pipe(
        map((event: any) => {
          return event.target.value.trim();
        }),
        distinctUntilChanged()
      )
      .subscribe(data => {
        this.filterMaterialsList(data);
      });
  }

  /**
   * Emits the material selected for displaying its details
   * @param materialItem the selected item from the list
   */
  selectMaterial(materialItem: MaterialModel): void {
    this.selectedMaterial.emit(materialItem);
  }

  bookItem(event: Event, material: MaterialModel): void {
    event.stopPropagation();
    console.log(material.DescTxt);
  }

  private filterMaterialsList(terms: string): void {
    this.filteredMaterials = computed(() => {
      return this.materials().filter(item =>
        item.DescTxt.toLowerCase().includes(terms.toLowerCase())
      );
    });
  }
}
