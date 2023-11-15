import { Routes } from '@angular/router';
import { MaterialShellComponent } from './materials/material-shell/material-shell.component';

export const routes: Routes = [
  // {
  //   path: '',
  //   loadComponent: () => import('./app.component').then(x => x.AppComponent),
  // },
  {
    path: 'materials',
    // component: MaterialShellComponent,
    loadComponent: () =>
      import('./materials/material-shell/material-shell.component').then(
        x => x.MaterialShellComponent
      ),
  },
];
