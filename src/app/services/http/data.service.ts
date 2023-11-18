import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Observable, map, mergeMap, of, tap } from 'rxjs';
import { DataSet, MaterialModel } from '../../domain/material.interface';
import { toSignal } from '@angular/core/rxjs-interop';
import { LS_ITEM_NAME, StorageService } from '../storage/storage.service';

const JSONUrl = '/assets/MatPricingSet.json';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private http = inject(HttpClient);
  private storageService = inject(StorageService);

  private getMaterialsList$: Observable<MaterialModel[]> = this.storageService
    .get('materials')
    .pipe(
      mergeMap(localStorageData => {
        if (localStorageData) {
          // If there is data in local storage, return it
          return of(localStorageData);
        } else {
          // If local storage is empty, make an HTTP request
          // and save in local storage
          return this.http.get<DataSet>(JSONUrl).pipe(
            map((data: DataSet) => data.d.PartSet.results),
            tap((results: MaterialModel[]) =>
              this.storageService.save(LS_ITEM_NAME.MaterialsList, results)
            )
          );
        }
      })
    );

  materials = toSignal<MaterialModel[], MaterialModel[]>(this.getMaterialsList$, {
    initialValue: [] as MaterialModel[],
  });
  materialsList = signal(this.materials());
  selectedMaterial = signal<MaterialModel | null>(null);

  /**
   * When booking update the list
   * @param material
   * @param quantity
   */
  updateMaterials(material: MaterialModel, quantity: string): void {
    const foundMaterial = this.materials().find(item => item.DescTxt === material.DescTxt);

    if (foundMaterial) {
      foundMaterial.Quantity = (parseInt(foundMaterial.Quantity) + parseInt(quantity)).toString();
      foundMaterial.Available = (parseInt(foundMaterial.Available) - parseInt(quantity)).toString();
    }

    this.materialsList.update(() => [...this.materials(), material]);
    this.storageService.save(LS_ITEM_NAME.MaterialsList, this.materials());
  }

  selectMaterial(material: MaterialModel): void {
    this.selectedMaterial.set(material);
    this.storageService.save(LS_ITEM_NAME.SelectedMaterial, material);
  }

  getSelectedMaterial(): void {
    const selectedMaterial = this.storageService.getSingle();
    this.selectedMaterial.set(selectedMaterial);
  }
}
