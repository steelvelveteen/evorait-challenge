import { Injectable } from '@angular/core';
import { MaterialPricingSet } from '../../domain/material.interface';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {}

  saveToLocalStorage = (set: MaterialPricingSet): void => {
    localStorage.setItem('materialPricingSet', JSON.stringify(set));
  };

  getMaterialPricingSet = (): string | null => {
    return localStorage.getItem('materialPricingSet');
  };
}
