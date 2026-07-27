import { Routes } from '@angular/router';

export const MEDICAL_ROUTES: Routes = [
  {
    path: 'consultation',
    loadComponent: () =>
      import('../presentation/pages/occupational-medical-consultation/occupational-medical-consultation.component').then(
        (m) => m.OccupationalMedicalConsultationComponent,
      ),
  },
];
