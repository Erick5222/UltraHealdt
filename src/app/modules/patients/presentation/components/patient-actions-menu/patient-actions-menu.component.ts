import { Component, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

export type PatientActionsPlacement = 'bottom' | 'top';

@Component({
  selector: 'uh-patient-actions-menu',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './patient-actions-menu.component.html',
  styleUrl: './patient-actions-menu.component.scss',
  host: {
    class: 'patient-actions-menu-host',
    '(document:click)': 'close()',
  },
})
export class PatientActionsMenuComponent {
  patientId = input.required<string>();
  placement = input<PatientActionsPlacement>('bottom');

  protected readonly isOpen = signal(false);

  protected toggle(event: Event): void {
    event.stopPropagation();
    this.isOpen.update((open) => !open);
  }

  protected close(): void {
    this.isOpen.set(false);
  }

  protected onMenuClick(event: Event): void {
    event.stopPropagation();
    this.close();
  }

  protected editRoute(): string[] {
    return ['/patients', this.patientId(), 'edit'];
  }

  protected viewRoute(): string[] {
    return ['/patients', this.patientId()];
  }
}
