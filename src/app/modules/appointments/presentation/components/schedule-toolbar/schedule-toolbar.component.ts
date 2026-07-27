import { Component, input, output } from '@angular/core';
import { AppointmentStatusFilter } from '../../pages/schedule/schedule.config';

@Component({
  selector: 'uh-schedule-toolbar',
  standalone: true,
  templateUrl: './schedule-toolbar.component.html',
  styleUrl: './schedule-toolbar.component.scss',
})
export class ScheduleToolbarComponent {
  dateRangeLabel = input('');
  searchQuery = input('');
  statusFilter = input<AppointmentStatusFilter>('all');
  doctorFilter = input('all');
  professionals = input<string[]>([]);

  previous = output<void>();
  next = output<void>();
  today = output<void>();
  searchInput = output<Event>();
  statusFilterChange = output<AppointmentStatusFilter>();
  doctorFilterChange = output<string>();

  protected readonly statusOptions: { value: AppointmentStatusFilter; label: string }[] = [
    { value: 'all', label: 'Todos' },
    { value: 'confirmed', label: 'Confirmadas' },
    { value: 'pending', label: 'Pendientes' },
    { value: 'cancelled', label: 'Canceladas' },
  ];

  protected onStatusFilterChange(event: Event): void {
    this.statusFilterChange.emit((event.target as HTMLSelectElement).value as AppointmentStatusFilter);
  }

  protected onDoctorFilterChange(event: Event): void {
    this.doctorFilterChange.emit((event.target as HTMLSelectElement).value);
  }
}
