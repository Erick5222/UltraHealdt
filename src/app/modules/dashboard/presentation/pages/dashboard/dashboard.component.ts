import { Component } from '@angular/core';
import { DashboardBodyComponent } from '../../components/dashboard-body/dashboard-body.component';
import { DashboardHeroComponent } from '../../components/dashboard-hero/dashboard-hero.component';
import { DashboardStatsComponent } from '../../components/dashboard-stats/dashboard-stats.component';

@Component({
  selector: 'uh-dashboard',
  standalone: true,
  imports: [DashboardBodyComponent, DashboardHeroComponent, DashboardStatsComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {}
