import { Component, input, output } from '@angular/core';

@Component({
  selector: 'uh-invoice-notes-panel',
  standalone: true,
  templateUrl: './invoice-notes-panel.component.html',
  styleUrl: './invoice-notes-panel.component.scss',
})
export class InvoiceNotesPanelComponent {
  notes = input('');

  notesChange = output<string>();
}
