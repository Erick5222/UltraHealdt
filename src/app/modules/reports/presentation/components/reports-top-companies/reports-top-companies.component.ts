import { DecimalPipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { ReportsCompanyRank } from '../../pages/reports/reports.config';

@Component({
  selector: 'uh-reports-top-companies',
  standalone: true,
  imports: [DecimalPipe],
  templateUrl: './reports-top-companies.component.html',
  styleUrl: './reports-top-companies.component.scss',
})
export class ReportsTopCompaniesComponent {
  companies = input.required<ReportsCompanyRank[]>();
  serviceTags = input.required<string[]>();
}
