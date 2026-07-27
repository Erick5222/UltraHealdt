import { Component, input } from '@angular/core';
import { UpcomingPatientStatus } from '../dashboard-upcoming-patients/dashboard-upcoming-patients.config';

@Component({
  selector: 'uh-dashboard-upcoming-patient-row',
  standalone: true,
  templateUrl: './dashboard-upcoming-patient-row.component.html',
  styleUrl: './dashboard-upcoming-patient-row.component.scss',
})
export class DashboardUpcomingPatientRowComponent {
  avatar = input.required<string>();
  name = input.required<string>();
  examType = input.required<string>();
  company = input.required<string>();
  time = input.required<string>();
  status = input.required<UpcomingPatientStatus>();
  statusLabel = input.required<string>();
  showDivider = input(true);
}
