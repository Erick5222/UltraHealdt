import { Component, input } from '@angular/core';
import {
  DashboardStatAccentTone,
  DashboardStatBadgeTone,
  DashboardStatIconTone,
} from '../dashboard-stats/dashboard-stats.config';

@Component({
  selector: 'uh-dashboard-stat-card',
  standalone: true,
  templateUrl: './dashboard-stat-card.component.html',
  styleUrl: './dashboard-stat-card.component.scss',
})
export class DashboardStatCardComponent {
  icon = input.required<string>();
  label = input.required<string>();
  value = input.required<string>();
  badge = input.required<string>();
  badgeTone = input<DashboardStatBadgeTone>('neutral');
  accentTone = input<DashboardStatAccentTone>('primary');
  iconTone = input<DashboardStatIconTone>('primary');
}
