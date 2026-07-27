import { Routes } from '@angular/router';

export const PATIENTS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('../presentation/pages/patients-list/patients-list.component').then(
        (m) => m.PatientsListComponent,
      ),
  },
  {
    path: 'new',
    loadComponent: () =>
      import('../presentation/pages/patient-form/patient-form.component').then(
        (m) => m.PatientFormComponent,
      ),
  },
  {
    path: ':id/edit',
    loadComponent: () =>
      import('../presentation/pages/patient-form/patient-form.component').then(
        (m) => m.PatientFormComponent,
      ),
  },
  {
    path: ':id/view',
    loadComponent: () =>
      import('../presentation/pages/patient-form/patient-form.component').then(
        (m) => m.PatientFormComponent,
      ),
  },
  {
    path: ':id',
    loadComponent: () =>
      import('../presentation/pages/patient-profile/patient-profile.component').then(
        (m) => m.PatientProfileComponent,
      ),
    children: [
      {
        path: '',
        redirectTo: 'resumen',
        pathMatch: 'full',
      },
      {
        path: 'resumen',
        loadComponent: () =>
          import('../presentation/pages/patient-profile-summary/patient-profile-summary.component').then(
            (m) => m.PatientProfileSummaryComponent,
          ),
      },
      {
        path: 'historia-clinica',
        loadComponent: () =>
          import('../presentation/pages/medical-history/medical-history.component').then(
            (m) => m.MedicalHistoryComponent,
          ),
      },
      {
        path: 'atenciones',
        loadComponent: () =>
          import('../../medical/presentation/pages/occupational-medical-consultation/occupational-medical-consultation.component').then(
            (m) => m.OccupationalMedicalConsultationComponent,
          ),
      },
      {
        path: 'examenes',
        loadComponent: () =>
          import('../presentation/pages/patient-profile-section/patient-profile-section.component').then(
            (m) => m.PatientProfileSectionComponent,
          ),
        data: { section: 'examenes' },
      },
      {
        path: 'documentos',
        loadComponent: () =>
          import('../presentation/pages/patient-profile-section/patient-profile-section.component').then(
            (m) => m.PatientProfileSectionComponent,
          ),
        data: { section: 'documentos' },
      },
      {
        path: 'restricciones',
        loadComponent: () =>
          import('../presentation/pages/patient-profile-section/patient-profile-section.component').then(
            (m) => m.PatientProfileSectionComponent,
          ),
        data: { section: 'restricciones' },
      },
    ],
  },
];
