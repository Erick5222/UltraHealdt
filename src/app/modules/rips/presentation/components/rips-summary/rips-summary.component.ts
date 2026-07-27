import { DecimalPipe } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { RipsSummaryStats } from '../../pages/rips/rips.config';

@Component({
  selector: 'uh-rips-summary',
  standalone: true,
  imports: [DecimalPipe],
  templateUrl: './rips-summary.component.html',
  styleUrl: './rips-summary.component.scss',
})
export class RipsSummaryComponent {
  stats = input.required<RipsSummaryStats>();
  attendNow = output<void>();
  validateInfo = output<void>();
  exportFile = output<void>();
}
