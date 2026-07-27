import { Component, input, output } from '@angular/core';

export type BillingStatusFilter =
  | 'all'
  | 'pending'
  | 'sent'
  | 'approved'
  | 'rejected'
  | 'cancelled';

@Component({
  selector: 'uh-billing-toolbar',
  standalone: true,
  templateUrl: './billing-toolbar.component.html',
  styleUrl: './billing-toolbar.component.scss',
})
export class BillingToolbarComponent {
  statusFilter = input<BillingStatusFilter>('all');
  searchQuery = input('');

  statusFilterChange = output<BillingStatusFilter>();
  searchInput = output<Event>();

  protected readonly filters: { value: BillingStatusFilter; label: string }[] = [
    { value: 'all', label: 'Todas' },
    { value: 'pending', label: 'Pendientes' },
    { value: 'sent', label: 'Enviadas' },
    { value: 'approved', label: 'Aprobadas' },
    { value: 'rejected', label: 'Rechazadas' },
    { value: 'cancelled', label: 'Canceladas' },
  ];

  protected onStatusFilterChange(event: Event): void {
    this.statusFilterChange.emit((event.target as HTMLSelectElement).value as BillingStatusFilter);
  }
}
