export type NavigationIcon =
  | 'dashboard'
  | 'companies'
  | 'patients'
  | 'appointments'
  | 'medical-history'
  | 'documents'
  | 'artificial-intelligence'
  | 'billing'
  | 'rips'
  | 'reports'
  | 'administration'
  | 'settings';

export interface NavigationItem {
  label: string;
  route: string;
  icon: NavigationIcon;
}

export const PRIMARY_NAVIGATION: NavigationItem[] = [
  { label: 'Dashboard', route: '/dashboard', icon: 'dashboard' },
  { label: 'Empresas', route: '/companies', icon: 'companies' },
  { label: 'Pacientes', route: '/patients', icon: 'patients' },
  { label: 'Agenda', route: '/appointments', icon: 'appointments' },
  { label: 'Facturación', route: '/billing', icon: 'billing' },
  { label: 'RIPS', route: '/rips', icon: 'rips' },
  { label: 'Reportes', route: '/reports', icon: 'reports' },
];

export const SECONDARY_NAVIGATION: NavigationItem[] = [];
