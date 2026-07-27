import { Component, input, output } from '@angular/core';

@Component({
  selector: 'uh-invoice-electronic-panel',
  standalone: true,
  templateUrl: './invoice-electronic-panel.component.html',
  styleUrl: './invoice-electronic-panel.component.scss',
})
export class InvoiceElectronicPanelComponent {
  autoDianValidation = input(true);
  provider = input('FacturaTech SAS');

  autoDianValidationChange = output<boolean>();
  verifyResolution = output<void>();
}
