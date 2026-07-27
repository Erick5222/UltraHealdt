import { Component } from '@angular/core';
import { DashboardStatCardComponent } from '../dashboard-stat-card/dashboard-stat-card.component';
import { DASHBOARD_STATS } from './dashboard-stats.config';

@Component({
  selector: 'uh-dashboard-stats',
  standalone: true,
  imports: [DashboardStatCardComponent],
  templateUrl: './dashboard-stats.component.html',
  styleUrl: './dashboard-stats.component.scss',
})
export class DashboardStatsComponent {
  protected readonly stats = DASHBOARD_STATS;
}
