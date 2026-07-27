import { Component } from '@angular/core';
import { DashboardIaInsightComponent } from '../dashboard-ia-insight/dashboard-ia-insight.component';
import { DashboardRecentReportsComponent } from '../dashboard-recent-reports/dashboard-recent-reports.component';
import { DashboardUpcomingPatientsComponent } from '../dashboard-upcoming-patients/dashboard-upcoming-patients.component';

@Component({
  selector: 'uh-dashboard-body',
  standalone: true,
  imports: [
    DashboardUpcomingPatientsComponent,
    DashboardIaInsightComponent,
    DashboardRecentReportsComponent,
  ],
  templateUrl: './dashboard-body.component.html',
  styleUrl: './dashboard-body.component.scss',
})
export class DashboardBodyComponent {}
