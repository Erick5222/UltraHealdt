import { Component, input } from '@angular/core';

export type BillingDianStatus = 'approved' | 'pending' | 'sent' | 'rejected' | 'cancelled';

@Component({
  selector: 'uh-billing-status-badge',
  standalone: true,
  templateUrl: './billing-status-badge.component.html',
  styleUrl: './billing-status-badge.component.scss',
})
export class BillingStatusBadgeComponent {
  status = input<BillingDianStatus>('approved');
  label = input('Aprobada');
}
