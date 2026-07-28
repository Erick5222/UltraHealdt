import { Component, input } from '@angular/core';
import { ReportsIncomeBar } from '../../pages/reports/reports.config';

@Component({
  selector: 'uh-reports-income-projections',
  standalone: true,
  templateUrl: './reports-income-projections.component.html',
  styleUrl: './reports-income-projections.component.scss',
})
export class ReportsIncomeProjectionsComponent {
  total = input.required<string>();
  bars = input.required<ReportsIncomeBar[]>();
  growth = input.required<string>();
}
