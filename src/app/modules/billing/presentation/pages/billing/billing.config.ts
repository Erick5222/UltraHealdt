import { BillingDianStatus } from '../../components/billing-status-badge/billing-status-badge.component';
import { BillingStatusFilter } from '../../components/billing-toolbar/billing-toolbar.component';

export interface BillingInvoiceRecord {
  id: string;
  number: string;
  entityName: string;
  entityId: string;
  dateLabel: string;
  amountLabel: string;
  dianStatus: BillingDianStatus;
  dianStatusLabel: string;
  statusFilter: BillingStatusFilter;
  provider: string;
  showValidate: boolean;
  showCreditNote: boolean;
  searchText: string;
}

export const BILLING_PAGE_SIZE = 10;

export const BILLING_INVOICES: BillingInvoiceRecord[] = [
  {
    id: 'inv-0891',
    number: 'FE-2024-0891',
    entityName: 'Constructora Bolívar S.A.',
    entityId: 'NIT: 860.000.123-4',
    dateLabel: '24 Oct, 2023',
    amountLabel: '$4.250.000',
    dianStatus: 'approved',
    dianStatusLabel: 'Aprobada',
    statusFilter: 'approved',
    provider: 'FacturaTech SAS',
    showValidate: false,
    showCreditNote: false,
    searchText: 'FE-2024-0891 Constructora Bolívar 860.000.123-4',
  },
  {
    id: 'inv-0890',
    number: 'FE-2024-0890',
    entityName: 'Carlos Eduardo Ruiz',
    entityId: 'CC: 1.023.456.789',
    dateLabel: '23 Oct, 2023',
    amountLabel: '$185.000',
    dianStatus: 'pending',
    dianStatusLabel: 'Pendiente',
    statusFilter: 'pending',
    provider: 'FacturaTech SAS',
    showValidate: true,
    showCreditNote: true,
    searchText: 'FE-2024-0890 Carlos Eduardo Ruiz 1.023.456.789',
  },
  {
    id: 'inv-0889',
    number: 'FE-2024-0889',
    entityName: 'Logística Global S.A.S.',
    entityId: 'NIT: 900.123.456-7',
    dateLabel: '22 Oct, 2023',
    amountLabel: '$12.800.000',
    dianStatus: 'rejected',
    dianStatusLabel: 'Rechazada',
    statusFilter: 'rejected',
    provider: 'FacturaTech SAS',
    showValidate: false,
    showCreditNote: false,
    searchText: 'FE-2024-0889 Logística Global 900.123.456-7',
  },
  {
    id: 'inv-0888',
    number: 'FE-2024-0888',
    entityName: 'María Fernanda López',
    entityId: 'CC: 52.345.678',
    dateLabel: '21 Oct, 2023',
    amountLabel: '$320.000',
    dianStatus: 'sent',
    dianStatusLabel: 'Enviada',
    statusFilter: 'sent',
    provider: 'FacturaTech SAS',
    showValidate: false,
    showCreditNote: false,
    searchText: 'FE-2024-0888 María Fernanda López 52.345.678',
  },
  {
    id: 'inv-0887',
    number: 'FE-2024-0887',
    entityName: 'Tech Corp Solutions SAS',
    entityId: 'NIT: 901.555.888-1',
    dateLabel: '20 Oct, 2023',
    amountLabel: '$8.450.000',
    dianStatus: 'cancelled',
    dianStatusLabel: 'Cancelada',
    statusFilter: 'cancelled',
    provider: 'FacturaTech SAS',
    showValidate: false,
    showCreditNote: false,
    searchText: 'FE-2024-0887 Tech Corp Solutions 901.555.888-1',
  },
  {
    id: 'inv-0886',
    number: 'FE-2024-0886',
    entityName: 'Ecopetrol S.A.',
    entityId: 'NIT: 899.999.068-1',
    dateLabel: '19 Oct, 2023',
    amountLabel: '$45.200.000',
    dianStatus: 'approved',
    dianStatusLabel: 'Aprobada',
    statusFilter: 'approved',
    provider: 'FacturaTech SAS',
    showValidate: false,
    showCreditNote: false,
    searchText: 'FE-2024-0886 Ecopetrol 899.999.068-1',
  },
];

export function matchesBillingSearch(invoice: BillingInvoiceRecord, query: string): boolean {
  if (!query.trim()) {
    return true;
  }

  const normalized = query.trim().toLowerCase();
  return invoice.searchText.toLowerCase().includes(normalized);
}

export function matchesBillingStatus(
  invoice: BillingInvoiceRecord,
  filter: BillingStatusFilter,
): boolean {
  if (filter === 'all') {
    return true;
  }

  return invoice.statusFilter === filter;
}

export function getBillingPageNumbers(currentPage: number, totalPages: number): number[] {
  if (totalPages <= 5) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  if (currentPage <= 3) {
    return [1, 2, 3, totalPages];
  }

  if (currentPage >= totalPages - 2) {
    return [1, totalPages - 2, totalPages - 1, totalPages];
  }

  return [1, currentPage - 1, currentPage, currentPage + 1, totalPages];
}

export function formatBillingPaginationLabel(
  currentPage: number,
  pageSize: number,
  totalItems: number,
): string {
  if (!totalItems) {
    return 'Mostrando 0 de 0 facturas';
  }

  const start = (currentPage - 1) * pageSize + 1;
  const end = Math.min(currentPage * pageSize, totalItems);
  return `Mostrando ${start}-${end} de ${totalItems.toLocaleString('es-CO')} facturas`;
}

export function exportBillingInvoicesToPdf(invoices: BillingInvoiceRecord[]): boolean {
  if (!invoices.length) {
    return false;
  }

  const generatedAt = new Date().toLocaleString('es-CO');
  const rows = invoices
    .map(
      (invoice) => `
        <tr>
          <td>${invoice.number}</td>
          <td>
            <strong>${invoice.entityName}</strong><br />
            <span>${invoice.entityId}</span>
          </td>
          <td>${invoice.dateLabel}</td>
          <td>${invoice.amountLabel}</td>
          <td>${invoice.dianStatusLabel}</td>
          <td>${invoice.provider}</td>
        </tr>
      `,
    )
    .join('');

  const html = `<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <title>Facturas Ultra Health</title>
    <style>
      body { font-family: Arial, sans-serif; color: #111827; padding: 24px; }
      h1 { margin: 0 0 8px; font-size: 22px; color: #00236f; }
      p { margin: 0 0 20px; color: #64748b; font-size: 13px; }
      table { width: 100%; border-collapse: collapse; font-size: 12px; }
      th, td { border: 1px solid #e2e8f0; padding: 10px 12px; text-align: left; vertical-align: top; }
      th { background: #f8fafc; color: #64748b; font-size: 11px; letter-spacing: 0.04em; text-transform: uppercase; }
      td span { color: #64748b; font-size: 11px; }
    </style>
  </head>
  <body>
    <h1>Reporte de Facturación</h1>
    <p>Ultra Health • Generado el ${generatedAt} • ${invoices.length} factura(s)</p>
    <table>
      <thead>
        <tr>
          <th>Número</th>
          <th>Empresa / Paciente</th>
          <th>Fecha</th>
          <th>Valor</th>
          <th>Estado DIAN</th>
          <th>Proveedor</th>
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

  window.setTimeout(() => {
    printWindow.print();
  }, 300);

  return true;
}
