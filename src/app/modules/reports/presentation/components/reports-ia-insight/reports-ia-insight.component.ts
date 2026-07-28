import { Component, output } from '@angular/core';

@Component({
  selector: 'uh-reports-ia-insight',
  standalone: true,
  templateUrl: './reports-ia-insight.component.html',
  styleUrl: './reports-ia-insight.component.scss',
})
export class ReportsIaInsightComponent {
  viewProposal = output<void>();
  dismiss = output<void>();
}
