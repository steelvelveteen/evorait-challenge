import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../services/data.service';
import { Router } from '@angular/router';
import { MaterialModule } from '../../material.module';
import { Material } from '../../domain/material.interface';
import { fromEvent, map } from 'rxjs';

@Component({
  selector: 'app-material-item-details',
  standalone: true,
  templateUrl: './material-item-details.component.html',
  styleUrl: './material-item-details.component.scss',
  imports: [CommonModule, MaterialModule],
})
export class MaterialItemDetailsComponent implements OnInit, AfterViewInit {
  private dataService = inject(DataService);
  private router = inject(Router);

  material!: Material;
  @ViewChild('quantityInputRef') quantityInputRef: ElementRef | undefined;
  isBookBtnDisabled = false;

  ngOnInit(): void {
    this.dataService.getStoredSelectedMaterial();

    this.material = this.dataService.selectedMaterial;
  }

  ngAfterViewInit(): void {
    // Listens for quantity inputs for availablity
    // Disables button and displays error message
    fromEvent(this.quantityInputRef?.nativeElement, 'input')
      .pipe(
        map((event: any) => {
          return event.target.value.trim();
        })
      )
      .subscribe(quantity => {
        this.isBookBtnDisabled = !this.dataService.checkAvailability(quantity, this.material);
      });
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
