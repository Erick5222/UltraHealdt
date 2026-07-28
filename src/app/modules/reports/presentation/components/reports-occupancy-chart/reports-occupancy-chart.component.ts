import { Component, input } from '@angular/core';
import { ReportsOccupancyBar } from '../../pages/reports/reports.config';

@Component({
  selector: 'uh-reports-occupancy-chart',
  standalone: true,
  templateUrl: './reports-occupancy-chart.component.html',
  styleUrl: './reports-occupancy-chart.component.scss',
})
export class ReportsOccupancyChartComponent {
  bars = input.required<ReportsOccupancyBar[]>();
}
