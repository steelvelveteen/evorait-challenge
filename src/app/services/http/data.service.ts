import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { DataSet, MaterialPricingSet } from '../../domain/material.interface';

const JSONUrl = '/assets/MatPricingSet.json';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private http = inject(HttpClient);

  constructor() {}

  loadJsonDataSet = (): Observable<DataSet> => this.http.get<DataSet>(JSONUrl);
}
