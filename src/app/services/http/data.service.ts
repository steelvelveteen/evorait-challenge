import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { EMPTY, Observable, map, mergeMap, of } from 'rxjs';
import { DataSet, MaterialModel } from '../../domain/material.interface';
import { toSignal } from '@angular/core/rxjs-interop';
import { StorageService } from '../storage/storage.service';

const JSONUrl = '/assets/MatPricingSet.json';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private http = inject(HttpClient);
  private storageService = inject(StorageService);

  // private loadMaterials$ = this.http
  // loadMaterials$ = this.http
  //   .get<DataSet>(JSONUrl)
  //   .pipe(map((data: DataSet) => data.d.PartSet.results));
  loadMaterials$: Observable<MaterialModel[]> = this.storageService
    .getMaterialsFromLocalStorage()
    .pipe(
      mergeMap(localStorageData => {
        if (localStorageData) {
          // If there is data in local storage, return it
          return of(localStorageData);
        } else {
          // If local storage is empty, make an HTTP request
          return this.http
            .get<DataSet>(JSONUrl)
            .pipe(map((data: DataSet) => data.d.PartSet.results));
        }
      })
    );

  // Somehow signals are still buggy?
  materials = toSignal<MaterialModel[], MaterialModel[]>(this.loadMaterials$, {
    initialValue: [] as MaterialModel[],
  });
}
