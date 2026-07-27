import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InvoiceClientInfoComponent, InvoiceClientInfoValue } from '../../components/invoice-client-info/invoice-client-info.component';
import { InvoiceElectronicPanelComponent } from '../../components/invoice-electronic-panel/invoice-electronic-panel.component';
import { InvoiceFormHeaderComponent } from '../../components/invoice-form-header/invoice-form-header.component';
import { InvoiceItemsTableComponent } from '../../components/invoice-items-table/invoice-items-table.component';
import { InvoiceNotesPanelComponent } from '../../components/invoice-notes-panel/invoice-notes-panel.component';
import { InvoiceSummaryPanelComponent } from '../../components/invoice-summary-panel/invoice-summary-panel.component';
import { BillingStateService } from '../../services/billing-state.service';
import {
  calculateInvoiceSummary,
  InvoiceFormItem,
  InvoiceFormValue,
} from './invoice-form.config';

@Component({
  selector: 'uh-invoice-form',
  standalone: true,
  imports: [
    InvoiceFormHeaderComponent,
    InvoiceClientInfoComponent,
    InvoiceItemsTableComponent,
    InvoiceSummaryPanelComponent,
    InvoiceElectronicPanelComponent,
    InvoiceNotesPanelComponent,
  ],
  templateUrl: './invoice-form.component.html',
  styleUrl: './invoice-form.component.scss',
})
export class InvoiceFormComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly billingState = inject(BillingStateService);

  private readonly invoiceId = signal<string | null>(this.route.snapshot.queryParamMap.get('id'));

  protected readonly form = signal<InvoiceFormValue>(this.billingState.getForm(this.invoiceId()));
  protected readonly actionMessage = signal<string | null>(null);

  protected readonly editMode = computed(() => !!this.invoiceId());

  protected readonly clientInfo = computed<InvoiceClientInfoValue>(() => {
    const current = this.form();
    return {
      clientId: current.clientId,
      clientName: current.clientName,
      clientHint: current.clientHint,
      issueDate: current.issueDate,
      dueDate: current.dueDate,
      paymentMethod: current.paymentMethod,
      currency: current.currency,
      trmLabel: current.trmLabel,
    };
  });

  protected readonly summary = computed(() => calculateInvoiceSummary(this.form().items));

  protected updateClientInfo(value: InvoiceClientInfoValue): void {
    this.form.update((current) => ({
      ...current,
      ...value,
    }));
  }

  protected updateItems(items: InvoiceFormItem[]): void {
    this.form.update((current) => ({
      ...current,
      items,
    }));
  }

  protected updateNotes(notes: string): void {
    this.form.update((current) => ({
      ...current,
      notes,
    }));
  }

  protected updateAutoDianValidation(autoDianValidation: boolean): void {
    this.form.update((current) => ({
      ...current,
      autoDianValidation,
    }));
  }

  protected onLoadFromAgenda(): void {
    this.showActionMessage('Servicios cargados desde la agenda.');
  }

  protected onImportExcel(): void {
    this.showActionMessage('Importación de Excel iniciada.');
  }

  protected onVerifyResolution(): void {
    this.showActionMessage('Verificación de resolución DIAN completada.');
  }

  protected saveInvoice(): void {
    const current = this.form();
    const payload: InvoiceFormValue = {
      ...current,
      id: current.id ?? this.invoiceId() ?? undefined,
    };

    this.billingState.saveForm(payload);
    this.showActionMessage(
      this.editMode()
        ? `Factura ${payload.number} actualizada correctamente.`
        : `Factura ${payload.number} guardada correctamente.`,
    );

    window.setTimeout(() => {
      void this.router.navigate(['/billing']);
    }, 900);
  }

  private showActionMessage(message: string): void {
    this.actionMessage.set(message);
    window.setTimeout(() => this.actionMessage.set(null), 3200);
  }
}
