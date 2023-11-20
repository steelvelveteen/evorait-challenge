import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Observable, map, mergeMap, of, tap } from 'rxjs';
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

  private getMaterialsList$: Observable<Material[]> = this.storageService.get('materials').pipe(
    mergeMap(localStorageData => {
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
    })
  );

  materials = toSignal<Material[], Material[]>(this.getMaterialsList$, {
    initialValue: [] as Material[],
  });
  materialsList = signal(this.materials());
  selectedMaterial!: Material;
  selectedIndex!: number;

  /**
   * Books material and updates list information
   * @param quantity number of items to book
   * @param material the material user wants to book
   */
  bookMaterial(material: Material, quantity: string): void {
    this.selectedIndex = this.materials().indexOf(material);
    this.selectedMaterial = this.materials()[this.selectedIndex];

    // Updates relevant quantity and availability properties
    // of the selected material
    if (this.selectedMaterial) {
      this.selectedMaterial.Quantity = (
        parseInt(this.selectedMaterial.Quantity) + parseInt(quantity)
      ).toString();
      this.selectedMaterial.Available = (
        parseInt(this.selectedMaterial.Available) - parseInt(quantity)
      ).toString();
    }

    // Updates materials list
    this.materialsList.update(() => [...this.materials(), material]);
    this.storageService.save(LS_ITEM_NAME.MaterialsList, this.materials());
  }

  selectMaterial(material: Material): void {
    this.selectedIndex = this.materials().indexOf(material);
    this.storageService.saveIndexSelectedMaterial(LS_ITEM_NAME.Index, this.selectedIndex);

    this.selectedMaterial = this.materials()[this.selectedIndex];
  }

  getStoredSelectedMaterial(): void {
    const index = this.storageService.getSavedIndex();
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
    if (!this.selectedIndex) {
      this.selectedIndex = this.storageService.getSavedIndex();
    }

    const tempIndex = this.selectedIndex + delta;
    if (tempIndex < 0 || tempIndex >= this.materials().length) return;

    this.selectedIndex += delta;
    this.storageService.saveIndexSelectedMaterial(LS_ITEM_NAME.Index, this.selectedIndex);
    this.getStoredSelectedMaterial();
  }
}
