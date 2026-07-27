import { Component, input, output } from '@angular/core';
import { AppointmentCardVariant } from '../../pages/schedule/schedule.config';

export type AppointmentCardDisplayMode = 'compact' | 'medium' | 'full';

@Component({
  selector: 'uh-appointment-card',
  standalone: true,
  templateUrl: './appointment-card.component.html',
  styleUrl: './appointment-card.component.scss',
})
export class AppointmentCardComponent {
  variant = input<AppointmentCardVariant>('confirmed');
  displayMode = input<AppointmentCardDisplayMode>('full');
  selected = input(false);
  select = output<void>();

  protected onSelect(event: Event): void {
    event.stopPropagation();
    this.select.emit();
  }
}
