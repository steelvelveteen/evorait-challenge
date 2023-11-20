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

  saveIndexSelectedMaterial(itemName: string, index: number): void {
    localStorage.setItem(itemName, JSON.stringify(index));
  }

  getSavedIndex(): number | null {
    const savedIndex = localStorage.getItem('index');
    if (savedIndex) {
      const index = parseInt(savedIndex, 10);
      return index;
    } else return null;
  }
}
