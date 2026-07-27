import { Component } from '@angular/core';
import { DashboardRecentReportRowComponent } from '../dashboard-recent-report-row/dashboard-recent-report-row.component';
import { DASHBOARD_RECENT_REPORTS } from './dashboard-recent-reports.config';

@Component({
  selector: 'uh-dashboard-recent-reports',
  standalone: true,
  imports: [DashboardRecentReportRowComponent],
  templateUrl: './dashboard-recent-reports.component.html',
  styleUrl: './dashboard-recent-reports.component.scss',
})
export class DashboardRecentReportsComponent {
  protected readonly reports = DASHBOARD_RECENT_REPORTS;
}
