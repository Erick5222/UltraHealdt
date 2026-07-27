export interface InvoiceFormItem {
  id: string;
  serviceName: string;
  serviceCode: string;
  quantity: number;
  unitPrice: number;
  discountPercent: number;
  ivaPercent: number;
}

export interface InvoiceFormSummary {
  subtotal: number;
  discount: number;
  taxableBase: number;
  iva: number;
  exempt: number;
  total: number;
}

export interface InvoiceFormValue {
  id?: string;
  number: string;
  clientId: string;
  clientName: string;
  clientHint: string;
  issueDate: string;
  dueDate: string;
  paymentMethod: string;
  currency: string;
  trmLabel: string;
  items: InvoiceFormItem[];
  notes: string;
  autoDianValidation: boolean;
  provider: string;
}

export const INVOICE_PAYMENT_METHODS = [
  'Transferencia Bancaria - 30 días',
  'Transferencia Bancaria - 15 días',
  'Efectivo',
  'Tarjeta de crédito',
] as const;

export const INVOICE_CURRENCIES = ['COP - Peso Colombiano', 'USD - Dólar Americano'] as const;

export function formatInvoiceCurrency(value: number): string {
  return `$ ${value.toLocaleString('es-CO')}`;
}

export function calculateItemTotal(item: InvoiceFormItem): number {
  const gross = item.quantity * item.unitPrice;
  const afterDiscount = gross * (1 - item.discountPercent / 100);
  return Math.round(afterDiscount * (1 + item.ivaPercent / 100));
}

export function calculateInvoiceSummary(items: InvoiceFormItem[]): InvoiceFormSummary {
  let subtotal = 0;
  let discount = 0;
  let taxableBase = 0;
  let iva = 0;
  let exempt = 0;

  for (const item of items) {
    const gross = item.quantity * item.unitPrice;
    const itemDiscount = gross * (item.discountPercent / 100);
    const net = gross - itemDiscount;
    const itemIva = item.ivaPercent > 0 ? net * (item.ivaPercent / 100) : 0;

    subtotal += gross;
    discount += itemDiscount;

    if (item.ivaPercent > 0) {
      taxableBase += net;
      iva += itemIva;
    } else {
      exempt += net;
    }
  }

  return {
    subtotal: Math.round(subtotal),
    discount: Math.round(discount),
    taxableBase: Math.round(taxableBase),
    iva: Math.round(iva),
    exempt: Math.round(exempt),
    total: Math.round(subtotal - discount + iva),
  };
}

export function createInvoiceItemId(): string {
  return `item-${Date.now()}`;
}

export function createDefaultInvoiceForm(): InvoiceFormValue {
  const items: InvoiceFormItem[] = [
    {
      id: 'item-1',
      serviceName: 'Examen Médico Ocupacional de Ingreso',
      serviceCode: 'CÓD: EMO-001 • Perfil Administrativo',
      quantity: 12,
      unitPrice: 85000,
      discountPercent: 0,
      ivaPercent: 19,
    },
    {
      id: 'item-2',
      serviceName: 'Audiometría Tamiz',
      serviceCode: 'CÓD: AUD-002 • Perfil Operativo',
      quantity: 12,
      unitPrice: 32000,
      discountPercent: 5,
      ivaPercent: 0,
    },
    {
      id: 'item-3',
      serviceName: 'Visiometría Ocupacional',
      serviceCode: 'CÓD: VIS-003 • Perfil Operativo',
      quantity: 12,
      unitPrice: 28500,
      discountPercent: 0,
      ivaPercent: 0,
    },
  ];

  return {
    number: 'FE-2024-0892',
    clientId: 'CLI-99210',
    clientName: 'Constructora Bolívar S.A.',
    clientHint: 'NIT: 860.003.541-6 • Bogotá, Calle 127 #13-45',
    issueDate: '2024-10-24',
    dueDate: '2024-11-24',
    paymentMethod: INVOICE_PAYMENT_METHODS[0],
    currency: INVOICE_CURRENCIES[0],
    trmLabel: 'TRM: $4,250.00',
    items,
    notes: '',
    autoDianValidation: true,
    provider: 'FacturaTech SAS',
  };
}

export function createInvoiceFormFromListRecord(record: {
  id: string;
  number: string;
  entityName: string;
  entityId: string;
  amountLabel: string;
}): InvoiceFormValue {
  const base = createDefaultInvoiceForm();
  const summaryTotal = Number(record.amountLabel.replace(/[^\d]/g, ''));

  return {
    ...base,
    id: record.id,
    number: record.number,
    clientName: record.entityName,
    clientHint: record.entityId,
    items: base.items.map((item, index) =>
      index === 0
        ? {
            ...item,
            quantity: 1,
            unitPrice: summaryTotal,
            discountPercent: 0,
            ivaPercent: 0,
          }
        : item,
    ).slice(0, 1),
    notes: '',
  };
}

export function buildInvoiceSearchText(form: InvoiceFormValue): string {
  return `${form.number} ${form.clientName} ${form.clientHint}`.toLowerCase();
}

export function cloneInvoiceForm(form: InvoiceFormValue): InvoiceFormValue {
  return {
    ...form,
    items: form.items.map((item) => ({ ...item })),
  };
}
