import { NgClass } from '@angular/common';
import { Component, input, output } from '@angular/core';
import {
  appointmentHeightOffset,
  appointmentTopOffset,
  getHourLabels,
  ScheduleAppointment,
  ScheduleDay,
  ScheduleMonthCell,
  ScheduleViewMode,
} from '../../pages/schedule/schedule.config';
import {
  AppointmentCardComponent,
  AppointmentCardDisplayMode,
} from '../appointment-card/appointment-card.component';

@Component({
  selector: 'uh-schedule-grid',
  standalone: true,
  imports: [NgClass, AppointmentCardComponent],
  templateUrl: './schedule-grid.component.html',
  styleUrl: './schedule-grid.component.scss',
})
export class ScheduleGridComponent {
  viewMode = input<ScheduleViewMode>('week');
  visibleDays = input<ScheduleDay[]>([]);
  appointments = input<ScheduleAppointment[]>([]);
  monthCells = input<ScheduleMonthCell[]>([]);
  selectedAppointmentId = input<string | null>(null);

  appointmentSelect = output<ScheduleAppointment>();
  daySelect = output<string>();

  protected readonly hourLabels = getHourLabels();

  protected appointmentsForDay(dayIso: string): ScheduleAppointment[] {
    return this.appointments()
      .filter((appointment) => appointment.dateIso === dayIso)
      .sort((a, b) => a.startMinutes - b.startMinutes);
  }

  protected appointmentTop(appointment: ScheduleAppointment): number {
    return appointmentTopOffset(appointment.startMinutes);
  }

  protected appointmentHeight(appointment: ScheduleAppointment): number {
    const proportional = appointmentHeightOffset(appointment.durationMinutes);

    if (this.isSelected(appointment.id)) {
      return Math.max(proportional, 72);
    }

    return proportional;
  }

  protected appointmentDisplayMode(appointment: ScheduleAppointment): AppointmentCardDisplayMode {
    if (this.isSelected(appointment.id)) {
      return 'full';
    }

    if (appointment.durationMinutes <= 25) {
      return 'compact';
    }

    return 'full';
  }

  protected isSelected(appointmentId: string): boolean {
    return this.selectedAppointmentId() === appointmentId;
  }

  protected onDayHeaderClick(day: ScheduleDay): void {
    if (this.appointmentsForDay(day.iso).length) {
      this.daySelect.emit(day.iso);
    }
  }

  protected onMonthCellClick(cell: ScheduleMonthCell): void {
    if (cell.hasAppointments) {
      this.daySelect.emit(cell.iso);
    }
  }

  protected monthCellClass(cell: ScheduleMonthCell): Record<string, boolean> {
    return {
      'schedule-month__cell--outside': !cell.isCurrentMonth,
      'schedule-month__cell--today': cell.isToday,
      'schedule-month__cell--booked': cell.hasAppointments,
    };
  }
}
