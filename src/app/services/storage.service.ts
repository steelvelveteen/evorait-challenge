import { Injectable } from '@angular/core';
import { Material } from '../domain/material.interface';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  save(itemName: string, item: Material[] | Material): void {
    localStorage.setItem(itemName, JSON.stringify(item));
  }

  get(itemName: string): Observable<Material[]> {
    return of(JSON.parse(localStorage.getItem(itemName)!));
  }

  getSingle(): Material | null {
    const localStorageItem = localStorage.getItem('selected-material');
    return localStorageItem ? (JSON.parse(localStorageItem) as Material) : null;
  }
}
