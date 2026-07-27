import { Component, computed, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ScheduleAppointment } from '../../pages/schedule/schedule.config';

@Component({
  selector: 'uh-appointment-detail-panel',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './appointment-detail-panel.component.html',
  styleUrl: './appointment-detail-panel.component.scss',
})
export class AppointmentDetailPanelComponent {
  appointment = input.required<ScheduleAppointment>();
  close = output<void>();
  reschedule = output<void>();
  cancelAppointment = output<void>();

  protected readonly historyRoute = computed(() => [
    '/patients',
    this.appointment().patientId,
    'historia-clinica',
  ]);

  protected readonly canCancel = computed(() => this.appointment().status !== 'cancelled');
}
