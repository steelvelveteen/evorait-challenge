import { Injectable } from '@angular/core';
import { Material } from '../domain/material.interface';
import { Observable, of } from 'rxjs';
import { LS_ITEM_NAME } from '../domain/local-storage.enum';

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

  saveIndex(itemName: string, index: number): void {
    localStorage.setItem(itemName, JSON.stringify(index));
  }

  getIndex(): number {
    const savedIndex = localStorage.getItem(LS_ITEM_NAME.Index);
    if (savedIndex) {
      const index = parseInt(savedIndex, 10);
      return index;
    } else return 0;
  }
}
