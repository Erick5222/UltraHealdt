import { Component, input } from '@angular/core';
import { InvoiceFormSummary } from '../../pages/invoice-form/invoice-form.config';

@Component({
  selector: 'uh-invoice-summary-panel',
  standalone: true,
  templateUrl: './invoice-summary-panel.component.html',
  styleUrl: './invoice-summary-panel.component.scss',
})
export class InvoiceSummaryPanelComponent {
  summary = input.required<InvoiceFormSummary>();
}
