import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Observable, catchError, map, mergeMap, of, tap } from 'rxjs';
import { DataSet, Material } from '../domain/material.interface';
import { toSignal } from '@angular/core/rxjs-interop';
import { StorageService } from './storage.service';
import { LS_ITEM_NAME } from '../domain/local-storage.enum';

const JSONUrl = '/assets/MatPricingSet.json';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private http = inject(HttpClient);
  private storageService = inject(StorageService);
  error = signal('');

  private getMaterialsList$: Observable<Material[]> = this.storageService
    .get(LS_ITEM_NAME.MaterialsList)
    .pipe(
      mergeMap(localStorageData => {
        // throw new Error('Failed to retrieve materials list');
        if (localStorageData) {
          // If there is data in local storage, return it
          return of(localStorageData);
        } else {
          // If local storage is empty, make an HTTP request
          // and save in local storage
          return this.http.get<DataSet>(JSONUrl).pipe(
            map((data: DataSet) => data.d.PartSet.results),
            tap((results: Material[]) =>
              this.storageService.save(LS_ITEM_NAME.MaterialsList, results)
            )
          );
        }
      }),
      catchError(error => {
        this.error.set(error.message);
        return of(error);
      })
    );

  materials = toSignal<Material[], Material[]>(this.getMaterialsList$, {
    initialValue: [] as Material[],
  });
  materialsList = signal(this.materials());
  selectedMaterial!: Material;
  selectedIndex = signal(0);

  /**
   * Books material and updates list information
   * @param quantity number of items to book
   * @param material the material user wants to book
   */
  bookMaterial(material: Material | undefined, quantity: string): void {
    if (material) {
      this.selectedIndex.set(this.materials().indexOf(material));
      this.selectedMaterial = this.materials()[this.selectedIndex()];

      if (this.selectedMaterial) {
        // Update quantity
        this.selectedMaterial.Quantity = (
          parseInt(this.selectedMaterial.Quantity) + parseInt(quantity)
        ).toString();

        // Update available
        this.selectedMaterial.Available = (
          parseInt(this.selectedMaterial.Available) - parseInt(quantity)
        ).toString();
      }

      // Updates materials list
      this.materialsList.update(() => [...this.materials(), material as Material]);
      this.storageService.save(LS_ITEM_NAME.MaterialsList, this.materials());
    }
  }

  /**
   * Gets the selected material by index for details vieww
   * Saves the index locally and in local storage
   * @param material the material selected
   */
  selectMaterial(material: Material): void {
    this.selectedIndex.set(this.materials().indexOf(material));
    this.storageService.saveIndex(LS_ITEM_NAME.Index, this.selectedIndex());

    this.selectedMaterial = this.materials()[this.selectedIndex()];
  }

  getStoredSelectedMaterial(): void {
    const index = this.storageService.getIndex();
    if (typeof index === 'number') {
      this.selectedMaterial = this.materials()[index];
    }
  }

  /**
   * Prevents user from booking a quantity greater than
   * what's available
   * @param quantity the quantity its intended to book
   * @param material the material for which user wants to book
   * @returns boolean if available
   */
  checkAvailability(quantity: string, material: Material): boolean {
    return parseInt(quantity) <= parseInt(material.Available);
  }

  /**
   * Next and Previous buttons: Adjusts the selected
   * index and updates the stored selected material
   * @param delta - The change in index (positive or negative)
   * @returns void
   */
  adjustIndexAndMaterial(delta: number): void {
    if (!this.selectedIndex()) {
      this.selectedIndex.set(this.storageService.getIndex());
    }

    const tempIndex = this.selectedIndex() + delta;
    if (tempIndex < 0 || tempIndex >= this.materials().length) return;

    this.selectedIndex.set(this.selectedIndex() + delta);
    this.storageService.saveIndex(LS_ITEM_NAME.Index, this.selectedIndex());
    this.getStoredSelectedMaterial();
  }
}
