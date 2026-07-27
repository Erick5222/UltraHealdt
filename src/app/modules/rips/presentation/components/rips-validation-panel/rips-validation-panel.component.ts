import { Component, input, output } from '@angular/core';
import { RipsValidationIssue, RIPS_BATCH_LABEL } from '../../pages/rips/rips.config';

@Component({
  selector: 'uh-rips-validation-panel',
  standalone: true,
  templateUrl: './rips-validation-panel.component.html',
  styleUrl: './rips-validation-panel.component.scss',
})
export class RipsValidationPanelComponent {
  issues = input.required<RipsValidationIssue[]>();
  criticalCount = input(0);
  batchLabel = RIPS_BATCH_LABEL;

  correctIssue = output<string>();
  revalidateAll = output<void>();
}
