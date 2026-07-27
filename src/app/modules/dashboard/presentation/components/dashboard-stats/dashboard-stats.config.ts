export type DashboardStatBadgeTone = 'primary' | 'neutral' | 'urgent';
export type DashboardStatAccentTone = 'primary' | 'secondary' | 'warning' | 'muted';
export type DashboardStatIconTone = 'primary' | 'warning' | 'muted';

export interface DashboardStatItem {
  icon: string;
  label: string;
  value: string;
  badge: string;
  badgeTone: DashboardStatBadgeTone;
  accentTone: DashboardStatAccentTone;
  iconTone: DashboardStatIconTone;
}

export const DASHBOARD_STATS: DashboardStatItem[] = [
  {
    icon: '/images/icons/Dashboard/ActivePatients.svg',
    label: 'Pacientes Activos',
    value: '2,814',
    badge: '+12%',
    badgeTone: 'primary',
    accentTone: 'primary',
    iconTone: 'primary',
  },
  {
    icon: '/images/icons/Dashboard/Date.svg',
    label: 'Citas del Día',
    value: '48',
    badge: 'Hoy',
    badgeTone: 'neutral',
    accentTone: 'secondary',
    iconTone: 'primary',
  },
  {
    icon: '/images/icons/Dashboard/PendingInformes.svg',
    label: 'Informes Pendientes',
    value: '14',
    badge: 'Urgente',
    badgeTone: 'urgent',
    accentTone: 'warning',
    iconTone: 'warning',
  },
  {
    icon: '/images/icons/Dashboard/Cumplieminto.svg',
    label: 'Cumplimiento',
    value: '98.2%',
    badge: 'RIPS',
    badgeTone: 'neutral',
    accentTone: 'muted',
    iconTone: 'muted',
  },
];
