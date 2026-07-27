import { Component, input, output } from '@angular/core';
import { INVOICE_CURRENCIES, INVOICE_PAYMENT_METHODS } from '../../pages/invoice-form/invoice-form.config';

export interface InvoiceClientInfoValue {
  clientId: string;
  clientName: string;
  clientHint: string;
  issueDate: string;
  dueDate: string;
  paymentMethod: string;
  currency: string;
  trmLabel: string;
}

@Component({
  selector: 'uh-invoice-client-info',
  standalone: true,
  templateUrl: './invoice-client-info.component.html',
  styleUrl: './invoice-client-info.component.scss',
})
export class InvoiceClientInfoComponent {
  value = input.required<InvoiceClientInfoValue>();

  valueChange = output<InvoiceClientInfoValue>();

  protected readonly paymentMethods = INVOICE_PAYMENT_METHODS;
  protected readonly currencies = INVOICE_CURRENCIES;

  protected updateField<K extends keyof InvoiceClientInfoValue>(
    field: K,
    event: Event,
  ): void {
    const target = event.target as HTMLInputElement | HTMLSelectElement;
    this.valueChange.emit({
      ...this.value(),
      [field]: target.value,
    });
  }
}
