import { Injectable } from '@angular/core';
import { MaterialModel, MaterialPricingSet } from '../../domain/material.interface';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {}

  saveToLocalStorage = (set: MaterialModel[]): void => {
    localStorage.setItem('materials', JSON.stringify(set));
  };

  getMaterialsFromLocalStorage = (): Observable<MaterialModel[]> => {
    return of(JSON.parse(localStorage.getItem('materials')!));
  };
}
