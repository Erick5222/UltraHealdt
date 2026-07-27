import { Routes } from '@angular/router';

export const BILLING_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('../presentation/pages/billing/billing.component').then((m) => m.BillingComponent),
  },
  {
    path: 'new',
    loadComponent: () =>
      import('../presentation/pages/invoice-form/invoice-form.component').then(
        (m) => m.InvoiceFormComponent,
      ),
  },
];
