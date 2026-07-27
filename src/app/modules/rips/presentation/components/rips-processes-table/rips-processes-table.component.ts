import { DecimalPipe } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { RipsProcessRecord, RIPS_REFERENCE } from '../../pages/rips/rips.config';
import { RipsStatusBadgeComponent } from '../rips-status-badge/rips-status-badge.component';

@Component({
  selector: 'uh-rips-processes-table',
  standalone: true,
  imports: [RipsStatusBadgeComponent, DecimalPipe],
  templateUrl: './rips-processes-table.component.html',
  styleUrl: './rips-processes-table.component.scss',
})
export class RipsProcessesTableComponent {
  processes = input.required<RipsProcessRecord[]>();
  showAll = input(false);
  reference = RIPS_REFERENCE;

  processAction = output<string>();
  toggleViewAll = output<void>();
}
