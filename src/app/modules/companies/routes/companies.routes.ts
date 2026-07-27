import { Routes } from '@angular/router';

export const COMPANIES_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('../presentation/pages/companies-list/companies-list.component').then(
        (m) => m.CompaniesListComponent,
      ),
  },
  {
    path: 'new',
    loadComponent: () =>
      import('../presentation/pages/company-form/company-form.component').then(
        (m) => m.CompanyFormComponent,
      ),
  },
  {
    path: ':id/edit',
    loadComponent: () =>
      import('../presentation/pages/company-form/company-form.component').then(
        (m) => m.CompanyFormComponent,
      ),
  },
];
