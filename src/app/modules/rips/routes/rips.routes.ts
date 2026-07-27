import { Routes } from '@angular/router';

export const RIPS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('../presentation/pages/rips/rips.component').then((m) => m.RipsComponent),
  },
];
