import { AfterViewInit, Component, ElementRef, ViewChild, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../services/data.service';
import { distinctUntilChanged, fromEvent, map } from 'rxjs';
import { MaterialModule } from '../../material.module';
import { MaterialItemComponent } from '../material-item/material-item.component';

@Component({
  selector: 'app-material-list',
  standalone: true,
  templateUrl: './material-list.component.html',
  styleUrl: './material-list.component.scss',
  imports: [CommonModule, MaterialModule, MaterialItemComponent],
})
export class MaterialListComponent implements AfterViewInit {
  private dataService = inject(DataService);

  materials = this.dataService.materials;
  filteredMaterials = this.dataService.materials;

  @ViewChild('filterInputRef') filterInputRef: ElementRef | undefined;
  @ViewChild('quantityInputRef') quantityInputRef: ElementRef | undefined;

  ngAfterViewInit(): void {
    this.filterInputRef?.nativeElement.focus();
    fromEvent(this.filterInputRef?.nativeElement, 'keyup')
      .pipe(
        map((event: any) => {
          return (event.target as HTMLInputElement).value.trim();
        }),
        distinctUntilChanged()
      )
      .subscribe(data => {
        this.filterMaterialsList(data);
      });
  }

  private filterMaterialsList(terms: string): void {
    this.filteredMaterials = computed(() =>
      this.materials().filter(item => item.DescTxt.toLowerCase().includes(terms.toLowerCase()))
    );
  }
}
