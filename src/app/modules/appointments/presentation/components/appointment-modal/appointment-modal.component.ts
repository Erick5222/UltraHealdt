import { Component, computed, effect, input, output, signal } from '@angular/core';
import {
  AppointmentFormValue,
  buildDefaultForm,
  buildFormFromAppointment,
  hasScheduleConflict,
  parseTimeValue,
  SCHEDULE_DURATIONS,
  SCHEDULE_EXAM_TYPES,
  SCHEDULE_PATIENTS,
  SCHEDULE_PROFESSIONALS,
  SCHEDULE_TIME_SLOTS,
  ScheduleAppointment,
  SchedulePatientOption,
} from '../../pages/schedule/schedule.config';

@Component({
  selector: 'uh-appointment-modal',
  standalone: true,
  templateUrl: './appointment-modal.component.html',
  styleUrl: './appointment-modal.component.scss',
})
export class AppointmentModalComponent {
  editingAppointment = input<ScheduleAppointment | null>(null);
  defaultDateIso = input('');
  appointments = input<ScheduleAppointment[]>([]);

  close = output<void>();
  save = output<AppointmentFormValue>();
  saveAndOpen = output<AppointmentFormValue>();

  protected readonly professionals = SCHEDULE_PROFESSIONALS;
  protected readonly examTypes = SCHEDULE_EXAM_TYPES;
  protected readonly durations = SCHEDULE_DURATIONS;
  protected readonly timeSlots = SCHEDULE_TIME_SLOTS;
  protected readonly patients = SCHEDULE_PATIENTS;

  protected readonly patientSearch = signal('');
  protected readonly patientId = signal('');
  protected readonly doctorName = signal('');
  protected readonly examType = signal('');
  protected readonly dateIso = signal('');
  protected readonly startTime = signal('09:00');
  protected readonly durationMinutes = signal<number>(SCHEDULE_DURATIONS[0]);
  protected readonly observations = signal('');

  protected readonly isEditMode = computed(() => Boolean(this.editingAppointment()));

  protected readonly modalTitle = computed(() =>
    this.isEditMode() ? 'Editar Cita' : 'Nueva Cita',
  );

  protected readonly filteredPatients = computed(() => {
    const query = this.patientSearch().trim().toLowerCase();
    if (!query) {
      return this.patients;
    }

    return this.patients.filter(
      (patient) =>
        patient.name.toLowerCase().includes(query) ||
        patient.document.includes(query) ||
        patient.company.toLowerCase().includes(query),
    );
  });

  protected readonly selectedPatient = computed(() => {
    const currentId = this.patientId();
    return this.patients.find((patient) => patient.id === currentId) ?? this.patients[0];
  });

  protected readonly currentStartMinutes = computed(() => {
    const { hour, minute } = parseTimeValue(this.startTime());
    return hour * 60 + minute;
  });

  protected readonly hasConflict = computed(() =>
    hasScheduleConflict(
      this.appointments(),
      this.doctorName(),
      this.dateIso(),
      this.currentStartMinutes(),
      this.editingAppointment()?.id,
    ),
  );

  protected readonly canSave = computed(
    () => Boolean(this.dateIso() && this.startTime() && this.doctorName() && !this.hasConflict()),
  );

  constructor() {
    effect(() => {
      const editing = this.editingAppointment();
      const form = editing
        ? buildFormFromAppointment(editing)
        : buildDefaultForm(this.defaultDateIso() || this.todayIso());

      this.applyForm(form);
    });
  }

  protected selectPatient(patient: SchedulePatientOption): void {
    this.patientId.set(patient.id);
    this.patientSearch.set('');
  }

  protected selectTimeSlot(slot: string): void {
    if (this.isSlotDisabled(slot)) {
      return;
    }

    this.startTime.set(slot);
  }

  protected isSlotSelected(slot: string): boolean {
    return this.startTime() === slot;
  }

  protected isSlotDisabled(slot: string): boolean {
    const { hour, minute } = parseTimeValue(slot);
    return hasScheduleConflict(
      this.appointments(),
      this.doctorName(),
      this.dateIso(),
      hour * 60 + minute,
      this.editingAppointment()?.id,
    );
  }

  protected onDoctorChange(event: Event): void {
    this.doctorName.set((event.target as HTMLSelectElement).value);
  }

  protected onExamTypeChange(event: Event): void {
    this.examType.set((event.target as HTMLSelectElement).value);
  }

  protected onDateChange(event: Event): void {
    this.dateIso.set((event.target as HTMLInputElement).value);
  }

  protected onTimeChange(event: Event): void {
    this.startTime.set((event.target as HTMLInputElement).value);
  }

  protected onDurationChange(event: Event): void {
    this.durationMinutes.set(Number((event.target as HTMLSelectElement).value));
  }

  protected onObservationsInput(event: Event): void {
    this.observations.set((event.target as HTMLTextAreaElement).value);
  }

  protected onPatientSearchInput(event: Event): void {
    this.patientSearch.set((event.target as HTMLInputElement).value);
  }

  protected submitSave(): void {
    if (!this.canSave()) {
      return;
    }

    this.save.emit(this.buildFormValue());
  }

  protected submitSaveAndOpen(): void {
    if (!this.canSave()) {
      return;
    }

    this.saveAndOpen.emit(this.buildFormValue());
  }

  private applyForm(form: AppointmentFormValue): void {
    this.patientId.set(form.patientId);
    this.doctorName.set(form.doctorName);
    this.examType.set(form.examType);
    this.dateIso.set(form.dateIso);
    this.startTime.set(form.startTime);
    this.durationMinutes.set(form.durationMinutes);
    this.observations.set(form.observations);
    this.patientSearch.set('');
  }

  private buildFormValue(): AppointmentFormValue {
    const patient = this.selectedPatient();
    return {
      id: this.editingAppointment()?.id,
      patientId: patient.id,
      patientName: patient.name,
      patientDocument: patient.document,
      patientAvatar: patient.avatar,
      company: patient.company,
      doctorName: this.doctorName(),
      examType: this.examType(),
      dateIso: this.dateIso(),
      startTime: this.startTime(),
      durationMinutes: this.durationMinutes(),
      observations: this.observations(),
    };
  }

  private todayIso(): string {
    const today = new Date();
    return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
  }
}
