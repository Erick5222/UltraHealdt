export type RecentReportIconTone = 'danger' | 'primary';

export interface RecentReportItem {
  icon: string;
  title: string;
  generatedAt: string;
  iconTone: RecentReportIconTone;
}

export const DASHBOARD_RECENT_REPORTS: RecentReportItem[] = [
  {
    icon: '/images/icons/Dashboard/analisis.svg',
    title: 'Análisis Epidemioló...',
    generatedAt: 'GENERADO HACE 2H',
    iconTone: 'danger',
  },
  {
    icon: '/images/icons/Dashboard/consolidadorip.svg',
    title: 'Consolidado RIPS S...',
    generatedAt: 'GENERADO HACE 5H',
    iconTone: 'primary',
  },
];
