import { Injectable, signal } from '@angular/core';
import { BillingInvoiceRecord, BILLING_INVOICES } from '../pages/billing/billing.config';
import {
  calculateInvoiceSummary,
  cloneInvoiceForm,
  createDefaultInvoiceForm,
  createInvoiceFormFromListRecord,
  formatInvoiceCurrency,
  InvoiceFormValue,
  buildInvoiceSearchText,
} from '../pages/invoice-form/invoice-form.config';

@Injectable({ providedIn: 'root' })
export class BillingStateService {
  private readonly invoices = signal<BillingInvoiceRecord[]>(BILLING_INVOICES.map((invoice) => ({ ...invoice })));
  private readonly forms = signal<Record<string, InvoiceFormValue>>(this.buildInitialForms());

  readonly invoiceList = this.invoices.asReadonly();

  getInvoice(id: string): BillingInvoiceRecord | undefined {
    return this.invoices().find((invoice) => invoice.id === id);
  }

  getForm(id: string | null): InvoiceFormValue {
    if (!id) {
      return cloneInvoiceForm(createDefaultInvoiceForm());
    }

    const existing = this.forms()[id];
    if (existing) {
      return cloneInvoiceForm(existing);
    }

    const invoice = this.getInvoice(id);
    if (!invoice) {
      return cloneInvoiceForm(createDefaultInvoiceForm());
    }

    return cloneInvoiceForm(createInvoiceFormFromListRecord(invoice));
  }

  saveForm(form: InvoiceFormValue): void {
    const summary = calculateInvoiceSummary(form.items);
    const savedForm = cloneInvoiceForm(form);
    const formId = form.id ?? `inv-${Date.now()}`;

    this.forms.update((current) => ({
      ...current,
      [formId]: { ...savedForm, id: formId },
    }));

    const listRecord: BillingInvoiceRecord = {
      id: formId,
      number: savedForm.number,
      entityName: savedForm.clientName,
      entityId: savedForm.clientHint,
      dateLabel: this.formatDisplayDate(savedForm.issueDate),
      amountLabel: formatInvoiceCurrency(summary.total),
      dianStatus: this.getInvoice(formId)?.dianStatus ?? 'pending',
      dianStatusLabel: this.getInvoice(formId)?.dianStatusLabel ?? 'Pendiente',
      statusFilter: this.getInvoice(formId)?.statusFilter ?? 'pending',
      provider: savedForm.provider,
      showValidate: this.getInvoice(formId)?.showValidate ?? true,
      showCreditNote: this.getInvoice(formId)?.showCreditNote ?? false,
      searchText: buildInvoiceSearchText({ ...savedForm, id: formId }),
    };

    this.invoices.update((current) => {
      const index = current.findIndex((invoice) => invoice.id === formId);
      if (index === -1) {
        return [listRecord, ...current];
      }

      const next = [...current];
      next[index] = { ...current[index], ...listRecord };
      return next;
    });
  }

  private buildInitialForms(): Record<string, InvoiceFormValue> {
    const defaultForm = createDefaultInvoiceForm();
    const forms: Record<string, InvoiceFormValue> = {};

    for (const invoice of BILLING_INVOICES) {
      if (invoice.id === 'inv-0891') {
        forms[invoice.id] = { ...cloneInvoiceForm(defaultForm), id: invoice.id, number: invoice.number };
        continue;
      }

      forms[invoice.id] = createInvoiceFormFromListRecord(invoice);
    }

    return forms;
  }

  private formatDisplayDate(isoDate: string): string {
    if (!isoDate) {
      return '';
    }

    const date = new Date(`${isoDate}T00:00:00`);
    return date.toLocaleDateString('es-CO', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  }
}
