import { Component, input, output } from '@angular/core';

export type BillingActionType = 'view' | 'xml' | 'send' | 'validate' | 'creditNote' | 'more';

@Component({
  selector: 'uh-billing-actions',
  standalone: true,
  templateUrl: './billing-actions.component.html',
  styleUrl: './billing-actions.component.scss',
})
export class BillingActionsComponent {
  showDetail = input(true);
  showSend = input(true);
  showValidate = input(false);
  showCreditNote = input(false);

  action = output<BillingActionType>();

  protected emitAction(type: BillingActionType, event: Event): void {
    event.stopPropagation();
    this.action.emit(type);
  }
}
