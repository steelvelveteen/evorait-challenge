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
   * @param material
   * @param quantity
   */
  bookMaterial(material: Material, quantity: string): void {
    // const indexMaterial = this.materials().indexOf(material);
    this.selectedIndex = this.materials().indexOf(material);
    this.selectedMaterial = this.materials()[this.selectedIndex];

    if (this.selectedMaterial) {
      this.selectedMaterial.Quantity = (
        parseInt(this.selectedMaterial.Quantity) + parseInt(quantity)
      ).toString();
      this.selectedMaterial.Available = (
        parseInt(this.selectedMaterial.Available) - parseInt(quantity)
      ).toString();
    }

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
   * @param quantity
   * @param material
   * @returns
   */
  checkAvailability(quantity: string, material: Material): boolean {
    if (parseInt(quantity) > parseInt(material.Available)) {
      // Display some error
      return false;
    } else {
      return true;
    }
  }

  getNextMaterial(): void {
    const tempIndex = this.selectedIndex + 1;
    if (tempIndex === this.materials().length) return;
    this.selectedIndex += 1;
    this.storageService.saveIndexSelectedMaterial(LS_ITEM_NAME.Index, this.selectedIndex);
  }

  getPreviousMaterial(): void {
    const tempIndex = this.selectedIndex - 1;
    if (tempIndex < 0) return;
    this.selectedIndex -= 1;
    this.storageService.saveIndexSelectedMaterial(LS_ITEM_NAME.Index, this.selectedIndex);
  }
}
