import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { map } from 'rxjs';
import { DataSet, MaterialModel } from '../../domain/material.interface';
import { toSignal } from '@angular/core/rxjs-interop';
const JSONUrl = '/assets/MatPricingSet.json';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private http = inject(HttpClient);

  // private loadMaterials$ = this.http
  loadMaterials$ = this.http
    .get<DataSet>(JSONUrl)
    .pipe(map((data: DataSet) => data.d.PartSet.results));

  // Somehow signals are still buggy?
  materials = toSignal<MaterialModel[], MaterialModel[]>(this.loadMaterials$, {
    initialValue: [] as MaterialModel[],
  });
}
