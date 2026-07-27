import { Component, input } from '@angular/core';

export type RipsProcessStatus = 'validated' | 'errors' | 'validating';

@Component({
  selector: 'uh-rips-status-badge',
  standalone: true,
  templateUrl: './rips-status-badge.component.html',
  styleUrl: './rips-status-badge.component.scss',
})
export class RipsStatusBadgeComponent {
  status = input<RipsProcessStatus>('validated');
  label = input('Validado');
}
