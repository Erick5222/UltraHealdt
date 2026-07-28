import { Component, input } from '@angular/core';
import { ReportsDoctorProductivity } from '../../pages/reports/reports.config';

@Component({
  selector: 'uh-reports-medical-productivity',
  standalone: true,
  templateUrl: './reports-medical-productivity.component.html',
  styleUrl: './reports-medical-productivity.component.scss',
})
export class ReportsMedicalProductivityComponent {
  average = input.required<number>();
  donutDash = input.required<string>();
  doctors = input.required<ReportsDoctorProductivity[]>();
}
