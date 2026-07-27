import { Component, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BillingActionType, BillingActionsComponent } from '../billing-actions/billing-actions.component';
import { BillingStatusBadgeComponent } from '../billing-status-badge/billing-status-badge.component';
import { BillingInvoiceRecord } from '../../pages/billing/billing.config';

@Component({
  selector: 'uh-billing-table',
  standalone: true,
  imports: [RouterLink, BillingActionsComponent, BillingStatusBadgeComponent],
  templateUrl: './billing-table.component.html',
  styleUrl: './billing-table.component.scss',
})
export class BillingTableComponent {
  invoices = input<BillingInvoiceRecord[]>([]);

  invoiceAction = output<{ invoice: BillingInvoiceRecord; action: BillingActionType }>();

  protected onAction(invoice: BillingInvoiceRecord, action: BillingActionType): void {
    this.invoiceAction.emit({ invoice, action });
  }
}
