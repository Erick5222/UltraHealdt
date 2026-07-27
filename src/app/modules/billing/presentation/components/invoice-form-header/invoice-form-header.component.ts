import { Component, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'uh-invoice-form-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './invoice-form-header.component.html',
  styleUrl: './invoice-form-header.component.scss',
})
export class InvoiceFormHeaderComponent {
  editMode = input(false);
  invoiceNumber = input('');

  save = output<void>();
}
