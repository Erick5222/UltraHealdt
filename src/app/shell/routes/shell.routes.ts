import { Routes } from '@angular/router';

export const SHELL_MODULE_ROUTES: Routes = [
  {
    path: 'dashboard',
    loadChildren: () =>
      import('../../modules/dashboard/routes/dashboard.routes').then(
        (m) => m.DASHBOARD_ROUTES,
      ),
  },
  {
    path: 'companies',
    loadChildren: () =>
      import('../../modules/companies/routes/companies.routes').then(
        (m) => m.COMPANIES_ROUTES,
      ),
  },
  {
    path: 'patients',
    loadChildren: () =>
      import('../../modules/patients/routes/patients.routes').then(
        (m) => m.PATIENTS_ROUTES,
      ),
  },
  {
    path: 'appointments',
    loadChildren: () =>
      import('../../modules/appointments/routes/appointments.routes').then(
        (m) => m.APPOINTMENTS_ROUTES,
      ),
  },
  {
    path: 'medical',
    loadChildren: () =>
      import('../../modules/medical/routes/medical.routes').then(
        (m) => m.MEDICAL_ROUTES,
      ),
  },
  {
    path: 'laboratory',
    loadChildren: () =>
      import('../../modules/laboratory/routes/laboratory.routes').then(
        (m) => m.LABORATORY_ROUTES,
      ),
  },
  {
    path: 'documents',
    loadChildren: () =>
      import('../../modules/documents/routes/documents.routes').then(
        (m) => m.DOCUMENTS_ROUTES,
      ),
  },
  {
    path: 'billing',
    loadChildren: () =>
      import('../../modules/billing/routes/billing.routes').then(
        (m) => m.BILLING_ROUTES,
      ),
  },
  {
    path: 'rips',
    loadChildren: () =>
      import('../../modules/rips/routes/rips.routes').then((m) => m.RIPS_ROUTES),
  },
  {
    path: 'reports',
    loadChildren: () =>
      import('../../modules/reports/routes/reports.routes').then(
        (m) => m.REPORTS_ROUTES,
      ),
  },
  {
    path: 'administration',
    loadChildren: () =>
      import('../../modules/administration/routes/administration.routes').then(
        (m) => m.ADMINISTRATION_ROUTES,
      ),
  },
];

export const SHELL_ROUTE: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('../layout/main-layout.component').then(
        (m) => m.MainLayoutComponent,
      ),
    children: SHELL_MODULE_ROUTES,
  },
];
