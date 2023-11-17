import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'materials',
    loadComponent: () =>
      import('./materials/material-shell/material-shell.component').then(
        x => x.MaterialShellComponent
      ),
  },
  {
    path: 'details',
    loadComponent: () =>
      import('./materials/material-item-details/material-item-details.component').then(
        x => x.MaterialItemDetailsComponent
      ),
  },
];
