import { Component, input } from '@angular/core';
import { RecentReportIconTone } from '../dashboard-recent-reports/dashboard-recent-reports.config';

@Component({
  selector: 'uh-dashboard-recent-report-row',
  standalone: true,
  templateUrl: './dashboard-recent-report-row.component.html',
  styleUrl: './dashboard-recent-report-row.component.scss',
})
export class DashboardRecentReportRowComponent {
  icon = input.required<string>();
  title = input.required<string>();
  generatedAt = input.required<string>();
  iconTone = input.required<RecentReportIconTone>();
  showDivider = input(true);
}
