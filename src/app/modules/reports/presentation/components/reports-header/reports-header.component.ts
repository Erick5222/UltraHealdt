import { Component, input, output } from '@angular/core';

@Component({
  selector: 'uh-reports-header',
  standalone: true,
  templateUrl: './reports-header.component.html',
  styleUrl: './reports-header.component.scss',
})
export class ReportsHeaderComponent {
  exportPdf = output<void>();
  shareView = output<void>();
}
