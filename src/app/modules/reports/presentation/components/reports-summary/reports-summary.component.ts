import { Component, input } from '@angular/core';
import { ReportsSummaryMetric } from '../../pages/reports/reports.config';

@Component({
  selector: 'uh-reports-summary',
  standalone: true,
  templateUrl: './reports-summary.component.html',
  styleUrl: './reports-summary.component.scss',
})
export class ReportsSummaryComponent {
  metrics = input.required<ReportsSummaryMetric[]>();
}
