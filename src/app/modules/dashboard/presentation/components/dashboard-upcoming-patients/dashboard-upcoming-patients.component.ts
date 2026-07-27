import { Component } from '@angular/core';
import { DashboardUpcomingPatientRowComponent } from '../dashboard-upcoming-patient-row/dashboard-upcoming-patient-row.component';
import { DASHBOARD_UPCOMING_PATIENTS } from './dashboard-upcoming-patients.config';

@Component({
  selector: 'uh-dashboard-upcoming-patients',
  standalone: true,
  imports: [DashboardUpcomingPatientRowComponent],
  templateUrl: './dashboard-upcoming-patients.component.html',
  styleUrl: './dashboard-upcoming-patients.component.scss',
})
export class DashboardUpcomingPatientsComponent {
  protected readonly patients = DASHBOARD_UPCOMING_PATIENTS;
}
