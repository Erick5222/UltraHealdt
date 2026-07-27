import { Component, input, output } from '@angular/core';
import { ScheduleViewMode } from '../../pages/schedule/schedule.config';

@Component({
  selector: 'uh-schedule-header',
  standalone: true,
  templateUrl: './schedule-header.component.html',
  styleUrl: './schedule-header.component.scss',
})
export class ScheduleHeaderComponent {
  viewMode = input<ScheduleViewMode>('week');
  viewModeChange = output<ScheduleViewMode>();
  newAppointment = output<void>();

  protected setViewMode(mode: ScheduleViewMode): void {
    this.viewModeChange.emit(mode);
  }

  protected isViewActive(mode: ScheduleViewMode): boolean {
    return this.viewMode() === mode;
  }
}
