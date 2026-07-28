export type ReportsTrendDirection = 'up' | 'down';

export interface ReportsFilterOption {
  value: string;
  label: string;
}

export interface ReportsFilterState {
  dateStart: string;
  dateEnd: string;
  company: string;
  doctor: string;
  examType: string;
  status: string;
}

export interface ReportsSummaryMetric {
  label: string;
  value: string;
  subtext: string;
  trend: string;
  trendDirection: ReportsTrendDirection;
  icon: string;
}

export interface ReportsOccupancyBar {
  label: string;
  capacity: number;
  used: number;
}

export interface ReportsCompanyRank {
  name: string;
  services: number;
  widthPercent: number;
}

export interface ReportsDoctorProductivity {
  name: string;
  value: string;
  avatar: string;
}

export interface ReportsIncomeBar {
  label: string;
  height: number;
  active: boolean;
  muted: boolean;
}

export interface ReportsDashboardView {
  summary: ReportsSummaryMetric[];
  occupancy: ReportsOccupancyBar[];
  companies: ReportsCompanyRank[];
  serviceTags: string[];
  productivityAverage: number;
  productivityDonutDash: string;
  doctors: ReportsDoctorProductivity[];
  incomeTotal: string;
  incomeBars: ReportsIncomeBar[];
  incomeGrowth: string;
}

export const REPORTS_COMPANY_OPTIONS: ReportsFilterOption[] = [
  { value: 'all', label: 'Todas las Empresas' },
  { value: 'techcorp', label: 'TechCorp Solutions' },
  { value: 'global-logistics', label: 'Global Logistics S.A.' },
  { value: 'distribuidora-andina', label: 'Distribuidora Andina' },
  { value: 'servicios-mineros', label: 'Servicios Mineros del Norte' },
];

export const REPORTS_DOCTOR_OPTIONS: ReportsFilterOption[] = [
  { value: 'all', label: 'Todos los Médicos' },
  { value: 'arango', label: 'Dr. Arango' },
  { value: 'rivas', label: 'Dra. Rivas' },
  { value: 'mendez', label: 'Dr. Mendez' },
];

export const REPORTS_EXAM_TYPE_OPTIONS: ReportsFilterOption[] = [
  { value: 'ingreso', label: 'Ingreso' },
  { value: 'periodico', label: 'Periódico' },
  { value: 'retiro', label: 'Retiro' },
  { value: 'reintegro', label: 'Reintegro' },
];

export const REPORTS_STATUS_OPTIONS: ReportsFilterOption[] = [
  { value: 'completed', label: 'Completado' },
  { value: 'pending', label: 'Pendiente' },
  { value: 'cancelled', label: 'Cancelado' },
  { value: 'all', label: 'Todos' },
];

export const DEFAULT_REPORTS_FILTERS: ReportsFilterState = {
  dateStart: '2023-10-01',
  dateEnd: '2023-10-31',
  company: 'all',
  doctor: 'all',
  examType: 'ingreso',
  status: 'completed',
};

const BASE_OCCUPANCY: ReportsOccupancyBar[] = [
  { label: '08:00', capacity: 72, used: 48 },
  { label: '09:00', capacity: 88, used: 78 },
  { label: '10:00', capacity: 92, used: 86 },
  { label: '11:00', capacity: 90, used: 72 },
  { label: '12:00', capacity: 70, used: 34 },
  { label: '13:00', capacity: 62, used: 18 },
  { label: '14:00', capacity: 68, used: 42 },
  { label: '15:00', capacity: 84, used: 66 },
  { label: '16:00', capacity: 88, used: 74 },
  { label: '17:00', capacity: 76, used: 52 },
];

const BASE_COMPANIES: ReportsCompanyRank[] = [
  { name: 'TechCorp Solutions', services: 420, widthPercent: 100 },
  { name: 'Global Logistics S.A.', services: 385, widthPercent: 92 },
  { name: 'Distribuidora Andina', services: 290, widthPercent: 69 },
  { name: 'Servicios Mineros del Norte', services: 215, widthPercent: 51 },
];

const BASE_DOCTORS: ReportsDoctorProductivity[] = [
  {
    name: 'Dr. Arango',
    value: '15.2 min/pac',
    avatar: '/images/illustrations/dashboard/patient-carlos-mendoza.svg',
  },
  {
    name: 'Dra. Rivas',
    value: '19.8 min/pac',
    avatar: '/images/illustrations/dashboard/patient-elena-rodriguez.svg',
  },
  {
    name: 'Dr. Mendez',
    value: '22.4 min/pac',
    avatar: '/images/illustrations/dashboard/patient-sandra-vargas.svg',
  },
];

const BASE_INCOME_BARS: ReportsIncomeBar[] = [
  { label: 'JUL', height: 58, active: false, muted: false },
  { label: 'AGO', height: 64, active: false, muted: false },
  { label: 'SEP', height: 72, active: false, muted: false },
  { label: 'OCT', height: 88, active: true, muted: false },
  { label: 'NOV', height: 76, active: false, muted: true },
  { label: 'DIC', height: 82, active: false, muted: true },
];

export function formatReportsDateRange(dateStart: string, dateEnd: string): string {
  const formatter = new Intl.DateTimeFormat('es-CO', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

  const start = formatter.format(new Date(`${dateStart}T12:00:00`));
  const end = formatter.format(new Date(`${dateEnd}T12:00:00`));
  return `${start} - ${end}`;
}

export function getReportsStatusLabel(status: string): string {
  return REPORTS_STATUS_OPTIONS.find((option) => option.value === status)?.label ?? 'Completado';
}

function getFilterFactor(filters: ReportsFilterState): number {
  let factor = 1;

  if (filters.company !== 'all') {
    factor *= 0.62;
  }

  if (filters.doctor !== 'all') {
    factor *= 0.74;
  }

  if (filters.examType === 'periodico') {
    factor *= 0.88;
  } else if (filters.examType === 'retiro') {
    factor *= 0.71;
  } else if (filters.examType === 'reintegro') {
    factor *= 0.58;
  }

  if (filters.status === 'pending') {
    factor *= 0.82;
  } else if (filters.status === 'cancelled') {
    factor *= 0.45;
  } else if (filters.status === 'all') {
    factor *= 1.08;
  }

  const start = new Date(`${filters.dateStart}T12:00:00`);
  const end = new Date(`${filters.dateEnd}T12:00:00`);
  const daySpan = Math.max(1, Math.round((end.getTime() - start.getTime()) / 86400000) + 1);
  factor *= Math.min(1.2, Math.max(0.55, daySpan / 31));

  return factor;
}

function scaleNumber(value: number, factor: number): number {
  return Math.round(value * factor);
}

function formatCurrency(value: number): string {
  return `$${value.toLocaleString('es-CO')}`;
}

function buildProductivityDonut(average: number): string {
  const ratio = Math.min(0.92, Math.max(0.35, average / 30));
  const filled = Math.round(289 * ratio);
  const empty = 289 - filled;
  return `${filled} ${empty}`;
}

export function buildReportsDashboardView(filters: ReportsFilterState): ReportsDashboardView {
  const factor = getFilterFactor(filters);

  const patients = scaleNumber(2482, factor);
  const appointments = scaleNumber(1150, factor);
  const companies = filters.company === 'all' ? 86 : 1;
  const billing = scaleNumber(142800, factor);
  const incomeTotal = scaleNumber(426200, factor);
  const productivityAverage = Number((18.5 * (filters.doctor === 'all' ? 1 : 0.94)).toFixed(1));

  const summary: ReportsSummaryMetric[] = [
    {
      label: 'Pacientes Atendidos',
      value: patients.toLocaleString('es-CO'),
      subtext: 'este mes',
      trend: factor >= 1 ? '+12.5%' : '-4.8%',
      trendDirection: factor >= 1 ? 'up' : 'down',
      icon: '/images/icons/Dashboard/ActivePatients.svg',
    },
    {
      label: 'Citas Realizadas',
      value: appointments.toLocaleString('es-CO'),
      subtext: 'este mes',
      trend: factor >= 0.9 ? '-2.1%' : '-6.4%',
      trendDirection: 'down',
      icon: '/images/icons/Dashboard/Date.svg',
    },
    {
      label: 'Empresas Activas',
      value: companies.toLocaleString('es-CO'),
      subtext: 'en cartera',
      trend: filters.company === 'all' ? '+4' : '+1',
      trendDirection: 'up',
      icon: '/images/icons/Navigation/companies.svg',
    },
    {
      label: 'Facturación',
      value: formatCurrency(billing),
      subtext: 'USD',
      trend: factor >= 1 ? '+18.2%' : '+6.1%',
      trendDirection: 'up',
      icon: '/images/icons/Navigation/billing.svg',
    },
  ];

  const occupancy = BASE_OCCUPANCY.map((bar) => ({
    ...bar,
    used: Math.min(bar.capacity - 8, Math.max(12, Math.round(bar.used * factor))),
  }));

  let companiesRank = BASE_COMPANIES.map((company) => ({
    ...company,
    services: scaleNumber(company.services, factor),
  }));

  if (filters.company !== 'all') {
    const selected = REPORTS_COMPANY_OPTIONS.find((option) => option.value === filters.company);
    companiesRank = [
      {
        name: selected?.label ?? 'Empresa seleccionada',
        services: scaleNumber(420, factor),
        widthPercent: 100,
      },
    ];
  }

  const maxServices = companiesRank[0]?.services ?? 1;
  companiesRank = companiesRank.map((company, index, list) => ({
    ...company,
    widthPercent: Math.round((company.services / (list[0]?.services || maxServices)) * 100),
  }));

  let doctors = BASE_DOCTORS;
  if (filters.doctor !== 'all') {
    doctors = BASE_DOCTORS.filter((doctor) => {
      if (filters.doctor === 'arango') {
        return doctor.name === 'Dr. Arango';
      }
      if (filters.doctor === 'rivas') {
        return doctor.name === 'Dra. Rivas';
      }
      return doctor.name === 'Dr. Mendez';
    });
  }

  const serviceTags =
    filters.examType === 'periodico'
      ? ['# Profesiograma', '# Audiometría', '# Visiometría']
      : filters.examType === 'retiro'
        ? ['# Lab. Clínico', '# Espirometría', '# Evaluación Médica']
        : ['# Audiometría', '# Profesiograma', '# Lab. Clínico'];

  const incomeBars = BASE_INCOME_BARS.map((bar) => ({
    ...bar,
    height: Math.max(42, Math.min(92, Math.round(bar.height * (0.85 + factor * 0.15)))),
  }));

  return {
    summary,
    occupancy,
    companies: companiesRank,
    serviceTags,
    productivityAverage,
    productivityDonutDash: buildProductivityDonut(productivityAverage),
    doctors,
    incomeTotal: formatCurrency(incomeTotal),
    incomeBars,
    incomeGrowth: factor >= 1 ? '+14.2%' : '+8.6%',
  };
}

export function exportReportsDashboardToPdf(
  filters: ReportsFilterState,
  view: ReportsDashboardView,
): boolean {
  const generatedAt = new Date().toLocaleString('es-CO');
  const dateRange = formatReportsDateRange(filters.dateStart, filters.dateEnd);
  const companyLabel =
    REPORTS_COMPANY_OPTIONS.find((option) => option.value === filters.company)?.label ??
    'Todas las Empresas';
  const doctorLabel =
    REPORTS_DOCTOR_OPTIONS.find((option) => option.value === filters.doctor)?.label ??
    'Todos los Médicos';
  const examLabel =
    REPORTS_EXAM_TYPE_OPTIONS.find((option) => option.value === filters.examType)?.label ??
    'Ingreso';

  const summaryRows = view.summary
    .map(
      (metric) => `
        <tr>
          <td>${metric.label}</td>
          <td>${metric.value}</td>
          <td>${metric.trend}</td>
          <td>${metric.subtext}</td>
        </tr>
      `,
    )
    .join('');

  const companyRows = view.companies
    .map(
      (company) => `
        <tr>
          <td>${company.name}</td>
          <td>${company.services.toLocaleString('es-CO')} servicios</td>
        </tr>
      `,
    )
    .join('');

  const html = `<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <title>Reportes Ultra Health</title>
    <style>
      body { font-family: Arial, sans-serif; color: #111827; padding: 24px; }
      h1 { margin: 0 0 8px; font-size: 22px; color: #00236f; }
      p { margin: 0 0 16px; color: #64748b; font-size: 13px; }
      table { width: 100%; border-collapse: collapse; font-size: 12px; margin-bottom: 24px; }
      th, td { border: 1px solid #e2e8f0; padding: 10px 12px; text-align: left; }
      th { background: #f8fafc; color: #64748b; text-transform: uppercase; font-size: 11px; }
      h2 { font-size: 16px; color: #00236f; margin: 24px 0 12px; }
    </style>
  </head>
  <body>
    <h1>Reportes - Analytics Dashboard</h1>
    <p>Ultra Health • Generado el ${generatedAt}</p>
    <p>
      Rango: ${dateRange} • Empresa: ${companyLabel} • Médico: ${doctorLabel} •
      Examen: ${examLabel} • Estado: ${getReportsStatusLabel(filters.status)}
    </p>
    <h2>Resumen</h2>
    <table>
      <thead>
        <tr>
          <th>Indicador</th>
          <th>Valor</th>
          <th>Tendencia</th>
          <th>Detalle</th>
        </tr>
      </thead>
      <tbody>${summaryRows}</tbody>
    </table>
    <h2>Top Empresas</h2>
    <table>
      <thead>
        <tr>
          <th>Empresa</th>
          <th>Volumen</th>
        </tr>
      </thead>
      <tbody>${companyRows}</tbody>
    </table>
    <p>Productividad médica promedio: ${view.productivityAverage} min/prom • Total Q3: ${view.incomeTotal}</p>
  </body>
</html>`;

  const printWindow = window.open('', '_blank', 'noopener,noreferrer,width=1024,height=768');
  if (!printWindow) {
    return false;
  }

  printWindow.document.open();
  printWindow.document.write(html);
  printWindow.document.close();
  printWindow.focus();
  window.setTimeout(() => printWindow.print(), 300);
  return true;
}

export async function shareReportsDashboardView(filters: ReportsFilterState): Promise<boolean> {
  const params = new URLSearchParams({
    from: filters.dateStart,
    to: filters.dateEnd,
    company: filters.company,
    doctor: filters.doctor,
    exam: filters.examType,
    status: filters.status,
  });
  const shareUrl = `${window.location.origin}/reports?${params.toString()}`;

  try {
    if (navigator.share) {
      await navigator.share({
        title: 'Reportes Ultra Health',
        text: 'Vista analítica compartida desde Ultra Health.',
        url: shareUrl,
      });
      return true;
    }

    await navigator.clipboard.writeText(shareUrl);
    return true;
  } catch {
    return false;
  }
}
