import { Component, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AppointmentDetailPanelComponent } from '../../components/appointment-detail-panel/appointment-detail-panel.component';
import { AppointmentModalComponent } from '../../components/appointment-modal/appointment-modal.component';
import { ScheduleGridComponent } from '../../components/schedule-grid/schedule-grid.component';
import { ScheduleHeaderComponent } from '../../components/schedule-header/schedule-header.component';
import { ScheduleToolbarComponent } from '../../components/schedule-toolbar/schedule-toolbar.component';
import {
  addDays,
  addMonths,
  AppointmentFormValue,
  AppointmentStatusFilter,
  appointmentFromForm,
  cancelScheduleAppointment,
  createAppointmentId,
  createScheduleBootstrap,
  formatDateRange,
  formatMonthTitle,
  getDefaultAnchorDate,
  getMonthCells,
  getVisibleDays,
  matchesAppointmentDoctor,
  matchesAppointmentSearch,
  matchesAppointmentStatus,
  parseIsoDate,
  SCHEDULE_PROFESSIONALS,
  ScheduleAppointment,
  ScheduleViewMode,
  toIsoDate,
  updateAppointmentFromForm,
} from './schedule.config';

@Component({
  selector: 'uh-schedule',
  standalone: true,
  imports: [
    ScheduleHeaderComponent,
    ScheduleToolbarComponent,
    ScheduleGridComponent,
    AppointmentDetailPanelComponent,
    AppointmentModalComponent,
  ],
  templateUrl: './schedule.component.html',
  styleUrl: './schedule.component.scss',
})
export class ScheduleComponent {
  private readonly router = inject(Router);
  private readonly bootstrap = createScheduleBootstrap();

  protected readonly appointments = signal(this.bootstrap.appointments);
  protected readonly modalOpen = signal(false);
  protected readonly editingAppointment = signal<ScheduleAppointment | null>(null);
  protected readonly actionMessage = signal<string | null>(null);
  protected readonly viewMode = signal<ScheduleViewMode>('week');
  protected readonly anchorDate = signal(this.bootstrap.anchorDate);
  protected readonly selectedAppointmentId = signal<string | null>(this.bootstrap.selectedAppointmentId);
  protected readonly searchQuery = signal('');
  protected readonly statusFilter = signal<AppointmentStatusFilter>('all');
  protected readonly doctorFilter = signal('all');
  protected readonly professionals = [...SCHEDULE_PROFESSIONALS];

  protected readonly modalDefaultDate = computed(() => toIsoDate(this.anchorDate()));

  protected readonly visibleDays = computed(() => getVisibleDays(this.viewMode(), this.anchorDate()));

  protected readonly dateRangeLabel = computed(() => {
    const anchor = this.anchorDate();
    const mode = this.viewMode();

    if (mode === 'month') {
      return formatMonthTitle(anchor);
    }

    const days = this.visibleDays();
    if (!days.length) {
      return '';
    }

    const start = parseIsoDate(days[0].iso);
    const end = parseIsoDate(days[days.length - 1].iso);
    return formatDateRange(start, end);
  });

  protected readonly filteredAppointments = computed(() => {
    const query = this.searchQuery();
    const filter = this.statusFilter();
    const doctor = this.doctorFilter();

    return this.appointments().filter(
      (appointment) =>
        matchesAppointmentSearch(appointment, query) &&
        matchesAppointmentStatus(appointment, filter) &&
        matchesAppointmentDoctor(appointment, doctor),
    );
  });

  protected readonly visibleAppointments = computed(() => {
    const days = new Set(this.visibleDays().map((day) => day.iso));
    return this.filteredAppointments().filter((appointment) => days.has(appointment.dateIso));
  });

  protected readonly monthCells = computed(() =>
    getMonthCells(this.anchorDate(), this.filteredAppointments()),
  );

  protected readonly selectedAppointment = computed(() => {
    const id = this.selectedAppointmentId();
    if (!id) {
      return null;
    }

    return this.filteredAppointments().find((appointment) => appointment.id === id) ?? null;
  });

  protected setViewMode(mode: ScheduleViewMode): void {
    this.viewMode.set(mode);
  }

  protected goPrevious(): void {
    const mode = this.viewMode();
    this.anchorDate.update((date) => {
      if (mode === 'month') {
        return addMonths(date, -1);
      }

      if (mode === 'day') {
        return addDays(date, -1);
      }

      return addDays(date, -7);
    });
  }

  protected goNext(): void {
    const mode = this.viewMode();
    this.anchorDate.update((date) => {
      if (mode === 'month') {
        return addMonths(date, 1);
      }

      if (mode === 'day') {
        return addDays(date, 1);
      }

      return addDays(date, 7);
    });
  }

  protected goToday(): void {
    this.anchorDate.set(getDefaultAnchorDate());
  }

  protected onSearchInput(event: Event): void {
    this.searchQuery.set((event.target as HTMLInputElement).value);
  }

  protected setStatusFilter(filter: AppointmentStatusFilter): void {
    this.statusFilter.set(filter);
    this.syncSelectionAfterFilter();
  }

  protected setDoctorFilter(doctor: string): void {
    this.doctorFilter.set(doctor);
    this.syncSelectionAfterFilter();
  }

  protected selectAppointment(appointment: ScheduleAppointment): void {
    this.selectedAppointmentId.set(appointment.id);
  }

  protected selectDay(dateIso: string): void {
    const dayAppointments = this.filteredAppointments()
      .filter((appointment) => appointment.dateIso === dateIso)
      .sort((a, b) => a.startMinutes - b.startMinutes);

    if (!dayAppointments.length) {
      return;
    }

    this.anchorDate.set(parseIsoDate(dateIso));
    this.selectedAppointmentId.set(dayAppointments[0].id);

    if (this.viewMode() === 'month') {
      this.viewMode.set('day');
    }
  }

  protected clearSelection(): void {
    this.selectedAppointmentId.set(null);
  }

  protected openModal(): void {
    this.editingAppointment.set(null);
    this.modalOpen.set(true);
  }

  protected openEditModal(appointment: ScheduleAppointment): void {
    this.editingAppointment.set(appointment);
    this.modalOpen.set(true);
  }

  protected closeModal(): void {
    this.modalOpen.set(false);
    this.editingAppointment.set(null);
  }

  protected saveAppointment(form: AppointmentFormValue): void {
    if (form.id) {
      this.appointments.update((list) =>
        list.map((appointment) =>
          appointment.id === form.id ? updateAppointmentFromForm(appointment, form) : appointment,
        ),
      );
      this.selectedAppointmentId.set(form.id);
      this.showActionMessage('Cita actualizada correctamente.');
    } else {
      const id = createAppointmentId();
      const created = appointmentFromForm(form, id);
      this.appointments.update((list) => [...list, created]);
      this.selectedAppointmentId.set(id);
      this.showActionMessage('Cita creada correctamente.');
    }

    this.anchorDate.set(parseIsoDate(form.dateIso));
    this.closeModal();
  }

  protected saveAppointmentAndOpen(form: AppointmentFormValue): void {
    this.saveAppointment(form);
    void this.router.navigate(['/patients', form.patientId, 'atenciones']);
  }

  protected cancelSelectedAppointment(appointment: ScheduleAppointment): void {
    if (appointment.status === 'cancelled') {
      return;
    }

    this.appointments.update((list) =>
      list.map((item) => (item.id === appointment.id ? cancelScheduleAppointment(item) : item)),
    );
    this.showActionMessage(`Cita de ${appointment.patientName} cancelada.`);
  }

  private syncSelectionAfterFilter(): void {
    const selected = this.selectedAppointment();
    if (!selected) {
      return;
    }

    const stillVisible = this.visibleAppointments().some((appointment) => appointment.id === selected.id);
    if (!stillVisible) {
      this.selectedAppointmentId.set(this.visibleAppointments()[0]?.id ?? null);
    }
  }

  private showActionMessage(message: string): void {
    this.actionMessage.set(message);
    window.setTimeout(() => this.actionMessage.set(null), 3200);
  }
}
