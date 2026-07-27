import { Routes } from '@angular/router';

export const APPOINTMENTS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('../presentation/pages/schedule/schedule.component').then(
        (m) => m.ScheduleComponent,
      ),
  },
];
