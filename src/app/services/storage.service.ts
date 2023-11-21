import { Injectable } from '@angular/core';
import { Material } from '../domain/material.interface';
import { Observable, of } from 'rxjs';
import { LS_ITEM_NAME } from '../domain/local-storage.enum';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  /**
   * Saves items (ex.: materials list) to local storage
   * @param itemName the name used to store in local storage
   * @param item the item to be stored under itemName
   */
  save(itemName: string, item: Material[]): void {
    localStorage.setItem(itemName, JSON.stringify(item));
  }

  /**
   *  Gets an item from Local Storage
   * @param itemName the name used to store in LS
   * @returns the item wrapped in an observable
   */
  get(itemName: string): Observable<Material[]> {
    return of(JSON.parse(localStorage.getItem(itemName)!));
  }

  /**
   * Saves the index of a selected item from materials list
   * @param itemName the name of the local storage item
   * @param index  the index of the selected material
   */
  saveIndex(itemName: string, index: number): void {
    localStorage.setItem(itemName, JSON.stringify(index));
  }

  /**
   *  Gets the index of selected material from LS
   * @returns a number containing the index
   * of the selected material
   */
  getIndex(): number {
    const savedIndex = localStorage.getItem(LS_ITEM_NAME.Index);
    if (savedIndex) {
      const index = parseInt(savedIndex, 10);
      return index;
    } else return 0;
  }
}
