import { Component, input, output } from '@angular/core';
import {
  calculateItemTotal,
  createInvoiceItemId,
  InvoiceFormItem,
} from '../../pages/invoice-form/invoice-form.config';

@Component({
  selector: 'uh-invoice-items-table',
  standalone: true,
  templateUrl: './invoice-items-table.component.html',
  styleUrl: './invoice-items-table.component.scss',
})
export class InvoiceItemsTableComponent {
  items = input<InvoiceFormItem[]>([]);

  itemsChange = output<InvoiceFormItem[]>();
  loadFromAgenda = output<void>();
  importExcel = output<void>();

  protected formatTotal(item: InvoiceFormItem): string {
    return calculateItemTotal(item).toLocaleString('es-CO');
  }

  protected addItem(): void {
    this.itemsChange.emit([
      ...this.items(),
      {
        id: createInvoiceItemId(),
        serviceName: 'Nuevo servicio',
        serviceCode: 'CÓD: N/A • Perfil General',
        quantity: 1,
        unitPrice: 0,
        discountPercent: 0,
        ivaPercent: 0,
      },
    ]);
  }

  protected removeLastItem(): void {
    if (this.items().length <= 1) {
      return;
    }

    this.itemsChange.emit(this.items().slice(0, -1));
  }

  protected updateItem(itemId: string, field: keyof InvoiceFormItem, event: Event): void {
    const target = event.target as HTMLInputElement;
    const rawValue = target.value;
    const value =
      field === 'serviceName' || field === 'serviceCode' || field === 'id'
        ? rawValue
        : Number(rawValue) || 0;

    this.itemsChange.emit(
      this.items().map((item) => (item.id === itemId ? { ...item, [field]: value } : item)),
    );
  }
}
