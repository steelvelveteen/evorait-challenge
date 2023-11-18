import { Injectable } from '@angular/core';
import { MaterialModel } from '../../domain/material.interface';
import { Observable, of } from 'rxjs';

export enum LS_ITEM_NAME {
  MaterialsList = 'materials',
  SelectedMaterial = 'selected-material',
}
@Injectable({
  providedIn: 'root',
})
export class StorageService {
  save(itemName: string, item: MaterialModel[] | MaterialModel): void {
    localStorage.setItem(itemName, JSON.stringify(item));
  }

  get(itemName: string): Observable<MaterialModel[]> {
    return of(JSON.parse(localStorage.getItem(itemName)!));
  }

  getSingle(): MaterialModel | null {
    const localStorageItem = localStorage.getItem('selected-material');
    return localStorageItem ? (JSON.parse(localStorageItem) as MaterialModel) : null;
  }
}
