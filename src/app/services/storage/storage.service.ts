import { Injectable } from '@angular/core';
import { MaterialModel, MaterialPricingSet } from '../../domain/material.interface';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {}

  saveToLocalStorage = (set: MaterialModel[]): void => {
    localStorage.setItem('materials', JSON.stringify(set));
  };

  getMaterialPricingSet = (): string | null => {
    return localStorage.getItem('materials');
  };
}
