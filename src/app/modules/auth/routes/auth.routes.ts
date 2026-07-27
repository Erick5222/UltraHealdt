import { Routes } from '@angular/router';

export const loadLoginComponent = () =>
  import('../presentation/pages/login/login.component').then(
    (m) => m.LoginComponent,
  );

export const AUTH_ROUTES: Routes = [
  // Rutas futuras del módulo auth: registro, recuperación de contraseña, etc.
];
