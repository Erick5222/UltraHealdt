import { Routes } from '@angular/router';
import { loadLoginComponent } from './modules/auth/routes/auth.routes';
import { SHELL_ROUTE } from './shell/routes/shell.routes';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: loadLoginComponent,
  },
  {
    path: 'login',
    loadComponent: loadLoginComponent,
  },
  ...SHELL_ROUTE,
  {
    path: '**',
    redirectTo: '',
  },
];

