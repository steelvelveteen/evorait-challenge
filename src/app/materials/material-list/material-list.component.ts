import { AfterViewInit, Component, ElementRef, ViewChild, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../services/http/data.service';
import { Material } from '../../domain/material.interface';
import { distinctUntilChanged, fromEvent, map } from 'rxjs';
import { MaterialModule } from '../../material.module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-material-list',
  standalone: true,
  templateUrl: './material-list.component.html',
  styleUrl: './material-list.component.scss',
  imports: [CommonModule, MaterialModule],
})
export class MaterialListComponent implements AfterViewInit {
  private dataService = inject(DataService);
  private router = inject(Router);

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

  /**
   * Emits the material selected for displaying its details
   * @param materialItem the selected item from the list
   */
  selectMaterial(materialItem: Material): void {
    this.router.navigate(['details']);
    this.dataService.selectMaterial(materialItem);
  }

  bookMaterial(event: Event, quantity: string, material: Material): void {
    event.stopPropagation();
    if (!quantity) {
      // Display some warning
      return;
    }
    if (parseInt(quantity) > parseInt(material.Available)) {
      // Display some error
      return;
    }

    this.dataService.bookMaterial(material, quantity);
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

  private filterMaterialsList(terms: string): void {
    this.filteredMaterials = computed(() =>
      this.materials().filter(item => item.DescTxt.toLowerCase().includes(terms.toLowerCase()))
    );
  }
}
