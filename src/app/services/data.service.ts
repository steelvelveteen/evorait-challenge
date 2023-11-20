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
  selectedMaterial = signal<Material | null>(null);

  /**
   * Books material and updates list information
   * @param material
   * @param quantity
   */
  bookMaterial(material: Material, quantity: string): void {
    const foundMaterial = this.materials().find(item => item.DescTxt === material.DescTxt);

    if (foundMaterial) {
      foundMaterial.Quantity = (parseInt(foundMaterial.Quantity) + parseInt(quantity)).toString();
      foundMaterial.Available = (parseInt(foundMaterial.Available) - parseInt(quantity)).toString();
    }

    this.materialsList.update(() => [...this.materials(), material]);
    this.storageService.save(LS_ITEM_NAME.MaterialsList, this.materials());
  }

  selectMaterial(material: Material): void {
    this.selectedMaterial.set(material);
    this.storageService.save(LS_ITEM_NAME.SelectedMaterial, material);
  }

  getSelectedMaterial(): void {
    const selectedMaterial = this.storageService.getSingle();
    this.selectedMaterial.set(selectedMaterial);
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
}
