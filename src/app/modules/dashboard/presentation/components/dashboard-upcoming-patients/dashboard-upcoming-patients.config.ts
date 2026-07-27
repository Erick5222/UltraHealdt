export type UpcomingPatientStatus = 'waiting' | 'scheduled';

export interface UpcomingPatientItem {
  avatar: string;
  name: string;
  examType: string;
  company: string;
  time: string;
  status: UpcomingPatientStatus;
  statusLabel: string;
}

export const DASHBOARD_UPCOMING_PATIENTS: UpcomingPatientItem[] = [
  {
    avatar: '/images/illustrations/dashboard/patient-elena-rodriguez.svg',
    name: 'Elena Rodríguez García',
    examType: 'Examen Periódico',
    company: 'Grupo Sura',
    time: '08:30 AM',
    status: 'waiting',
    statusLabel: 'En espera',
  },
  {
    avatar: '/images/illustrations/dashboard/patient-carlos-mendoza.svg',
    name: 'Carlos Mendoza',
    examType: 'Ingreso',
    company: 'Bancolombia',
    time: '09:15 AM',
    status: 'scheduled',
    statusLabel: 'Programado',
  },
  {
    avatar: '/images/illustrations/dashboard/patient-sandra-vargas.svg',
    name: 'Sandra Vargas',
    examType: 'Retiro',
    company: 'Ecopetrol',
    time: '10:00 AM',
    status: 'scheduled',
    statusLabel: 'Programado',
  },
];
