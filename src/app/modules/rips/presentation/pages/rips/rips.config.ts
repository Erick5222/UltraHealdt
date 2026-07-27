export type RipsProcessStatus = 'validated' | 'errors' | 'validating';
export type RipsProcessActionType = 'download' | 'errors' | 'status';

export interface RipsProcessRecord {
  id: string;
  dateLabel: string;
  periodLabel: string;
  company: string;
  records: number;
  status: RipsProcessStatus;
  statusLabel: string;
  actionType: RipsProcessActionType;
  isRecent: boolean;
}

export interface RipsValidationIssue {
  id: string;
  title: string;
  text: string;
  code: string;
  severity: 'danger' | 'warning';
  resolved: boolean;
}

export interface RipsSummaryStats {
  monthlyRecords: number;
  pendingValidation: number;
  progressPercent: number;
}

export const RIPS_REFERENCE = 'REF: 2023-Q4-RIPS';
export const RIPS_BATCH_LABEL = 'Lote #92831';

export const INITIAL_RIPS_PROCESSES: RipsProcessRecord[] = [
  {
    id: 'proc-001',
    dateLabel: '24 Oct 2023',
    periodLabel: 'Septiembre 2023',
    company: 'Constructora Bolívar S.A.',
    records: 4102,
    status: 'validated',
    statusLabel: 'Validado',
    actionType: 'download',
    isRecent: true,
  },
  {
    id: 'proc-002',
    dateLabel: '23 Oct 2023',
    periodLabel: 'Octubre 2023 (Parcial)',
    company: 'Logística Integral S.A.S',
    records: 892,
    status: 'errors',
    statusLabel: 'Con errores',
    actionType: 'errors',
    isRecent: true,
  },
  {
    id: 'proc-003',
    dateLabel: '22 Oct 2023',
    periodLabel: 'Septiembre 2023',
    company: 'Global Mining Corp',
    records: 1245,
    status: 'validating',
    statusLabel: 'Validando',
    actionType: 'status',
    isRecent: true,
  },
  {
    id: 'proc-004',
    dateLabel: '18 Oct 2023',
    periodLabel: 'Agosto 2023',
    company: 'Tech Corp Solutions SAS',
    records: 2380,
    status: 'validated',
    statusLabel: 'Validado',
    actionType: 'download',
    isRecent: false,
  },
  {
    id: 'proc-005',
    dateLabel: '12 Oct 2023',
    periodLabel: 'Agosto 2023 (Parcial)',
    company: 'Ecopetrol S.A.',
    records: 3150,
    status: 'errors',
    statusLabel: 'Con errores',
    actionType: 'errors',
    isRecent: false,
  },
];

export const INITIAL_RIPS_VALIDATION_ISSUES: RipsValidationIssue[] = [
  {
    id: 'issue-001',
    title: 'Datos incompletos del paciente',
    text: 'Falta dirección de residencia en 45 registros de consulta externa.',
    code: 'ERR_PAT_01',
    severity: 'danger',
    resolved: false,
  },
  {
    id: 'issue-002',
    title: 'Inconsistencia en códigos CIE-10',
    text: 'El código Z00.0 no corresponde a la especialidad de Optometría reportada.',
    code: 'ERR_DX_44',
    severity: 'danger',
    resolved: false,
  },
  {
    id: 'issue-003',
    title: 'Fechas fuera de rango',
    text: '12 procedimientos reportados con fecha posterior al cierre de periodo.',
    code: 'ERR_TIME_08',
    severity: 'warning',
    resolved: false,
  },
];

export function buildRipsSummaryStats(
  processes: RipsProcessRecord[],
  issues: RipsValidationIssue[],
): RipsSummaryStats {
  const monthlyRecords = processes.reduce((total, process) => total + process.records, 0);
  const pendingValidation = processes.filter(
    (process) => process.status === 'validating' || process.status === 'errors',
  ).length;
  const unresolvedIssues = issues.filter((issue) => !issue.resolved).length;
  const progressPercent = Math.max(35, Math.min(100, 100 - unresolvedIssues * 8 - pendingValidation * 5));

  return {
    monthlyRecords,
    pendingValidation: pendingValidation + unresolvedIssues,
    progressPercent,
  };
}

export function exportRipsProcessesFile(
  processes: RipsProcessRecord[],
  format: 'txt' | 'json',
): boolean {
  if (!processes.length) {
    return false;
  }

  const filename = `rips-export-${Date.now()}.${format}`;
  const content =
    format === 'json'
      ? JSON.stringify(processes, null, 2)
      : processes
          .map(
            (process) =>
              `${process.dateLabel}\t${process.periodLabel}\t${process.company}\t${process.records}\t${process.statusLabel}`,
          )
          .join('\n');

  const blob = new Blob([content], {
    type: format === 'json' ? 'application/json' : 'text/plain;charset=utf-8',
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
  return true;
}

export function exportRipsHistoryReport(processes: RipsProcessRecord[]): boolean {
  if (!processes.length) {
    return false;
  }

  const generatedAt = new Date().toLocaleString('es-CO');
  const rows = processes
    .map(
      (process) => `
        <tr>
          <td>${process.dateLabel}<br /><span>${process.periodLabel}</span></td>
          <td>${process.company}</td>
          <td>${process.records.toLocaleString('es-CO')}</td>
          <td>${process.statusLabel}</td>
        </tr>
      `,
    )
    .join('');

  const html = `<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <title>Historial RIPS Ultra Health</title>
    <style>
      body { font-family: Arial, sans-serif; color: #111827; padding: 24px; }
      h1 { margin: 0 0 8px; font-size: 22px; color: #00236f; }
      p { margin: 0 0 20px; color: #64748b; font-size: 13px; }
      table { width: 100%; border-collapse: collapse; font-size: 12px; }
      th, td { border: 1px solid #e2e8f0; padding: 10px 12px; text-align: left; vertical-align: top; }
      th { background: #f8fafc; color: #64748b; font-size: 11px; text-transform: uppercase; }
      td span { color: #64748b; font-size: 11px; }
    </style>
  </head>
  <body>
    <h1>Historial de Procesos RIPS</h1>
    <p>Ultra Health • ${RIPS_REFERENCE} • Generado el ${generatedAt}</p>
    <table>
      <thead>
        <tr>
          <th>Fecha / Periodo</th>
          <th>Empresa</th>
          <th>Registros</th>
          <th>Estado</th>
        </tr>
      </thead>
      <tbody>${rows}</tbody>
    </table>
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
