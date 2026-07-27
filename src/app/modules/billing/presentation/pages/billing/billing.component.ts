import { Component, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { BillingHeaderComponent } from '../../components/billing-header/billing-header.component';
import { BillingActionType } from '../../components/billing-actions/billing-actions.component';
import { BillingPaginationComponent } from '../../components/billing-pagination/billing-pagination.component';
import { BillingTableComponent } from '../../components/billing-table/billing-table.component';
import {
  BillingStatusFilter,
  BillingToolbarComponent,
} from '../../components/billing-toolbar/billing-toolbar.component';
import { BillingStateService } from '../../services/billing-state.service';
import {
  BILLING_PAGE_SIZE,
  BillingInvoiceRecord,
  formatBillingPaginationLabel,
  exportBillingInvoicesToPdf,
  getBillingPageNumbers,
  matchesBillingSearch,
  matchesBillingStatus,
} from './billing.config';

@Component({
  selector: 'uh-billing',
  standalone: true,
  imports: [
    BillingHeaderComponent,
    BillingToolbarComponent,
    BillingTableComponent,
    BillingPaginationComponent,
  ],
  templateUrl: './billing.component.html',
  styleUrl: './billing.component.scss',
})
export class BillingComponent {
  private readonly router = inject(Router);
  private readonly billingState = inject(BillingStateService);

  protected readonly pageSize = BILLING_PAGE_SIZE;
  protected readonly searchQuery = signal('');
  protected readonly statusFilter = signal<BillingStatusFilter>('all');
  protected readonly currentPage = signal(1);
  protected readonly actionMessage = signal<string | null>(null);

  protected readonly filteredInvoices = computed(() => {
    const query = this.searchQuery();
    const filter = this.statusFilter();

    return this.billingState.invoiceList().filter(
      (invoice) => matchesBillingSearch(invoice, query) && matchesBillingStatus(invoice, filter),
    );
  });

  protected readonly totalPages = computed(() =>
    Math.max(1, Math.ceil(this.filteredInvoices().length / this.pageSize)),
  );

  protected readonly pageNumbers = computed(() =>
    getBillingPageNumbers(this.currentPage(), this.totalPages()),
  );

  protected readonly paginatedInvoices = computed(() => {
    const start = (this.currentPage() - 1) * this.pageSize;
    return this.filteredInvoices().slice(start, start + this.pageSize);
  });

  protected readonly paginationLabel = computed(() =>
    formatBillingPaginationLabel(
      this.currentPage(),
      this.pageSize,
      this.filteredInvoices().length,
    ),
  );

  protected onSearchInput(event: Event): void {
    this.searchQuery.set((event.target as HTMLInputElement).value);
    this.currentPage.set(1);
  }

  protected setStatusFilter(filter: BillingStatusFilter): void {
    this.statusFilter.set(filter);
    this.currentPage.set(1);
  }

  protected goToPage(page: number): void {
    if (page < 1 || page > this.totalPages()) {
      return;
    }

    this.currentPage.set(page);
  }

  protected goPreviousPage(): void {
    this.goToPage(this.currentPage() - 1);
  }

  protected goNextPage(): void {
    this.goToPage(this.currentPage() + 1);
  }

  protected onInvoiceAction(payload: { invoice: BillingInvoiceRecord; action: BillingActionType }): void {
    const { invoice, action } = payload;

    switch (action) {
      case 'view':
        void this.router.navigate(['/billing/new'], { queryParams: { id: invoice.id } });
        return;
      case 'send':
        this.showActionMessage(`Factura ${invoice.number} enviada al cliente.`);
        return;
      case 'xml':
        this.showActionMessage(`Descarga XML iniciada para ${invoice.number}.`);
        return;
      case 'validate':
        this.showActionMessage(`Consulta de estado DIAN iniciada para ${invoice.number}.`);
        return;
      case 'creditNote':
        this.showActionMessage(`Nota crédito solicitada para ${invoice.number}.`);
        return;
      case 'more':
        this.showActionMessage(`Acciones adicionales disponibles para ${invoice.number}.`);
    }
  }

  protected exportInvoicesPdf(): void {
    const invoices = this.filteredInvoices();

    if (!invoices.length) {
      this.showActionMessage('No hay facturas para exportar con los filtros actuales.');
      return;
    }

    const exported = exportBillingInvoicesToPdf(invoices);
    if (exported) {
      this.showActionMessage(`Exportación PDF iniciada (${invoices.length} factura(s)).`);
      return;
    }

    this.showActionMessage('No se pudo abrir la ventana de exportación. Verifique el bloqueador de ventanas emergentes.');
  }

  private showActionMessage(message: string): void {
    this.actionMessage.set(message);
    window.setTimeout(() => this.actionMessage.set(null), 3200);
  }
}
