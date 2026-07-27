export type ScheduleViewMode = 'day' | 'week' | 'month';
export type AppointmentStatus = 'confirmed' | 'pending' | 'cancelled' | 'in-progress';
export type AppointmentStatusFilter = 'all' | AppointmentStatus;
export type AppointmentCardVariant = 'confirmed' | 'pending' | 'in-progress' | 'cancelled';

export interface ScheduleDay {
  iso: string;
  label: string;
  isToday: boolean;
}

export interface ScheduleMonthCell {
  iso: string;
  dayNumber: number;
  isCurrentMonth: boolean;
  isToday: boolean;
  appointmentCount: number;
  hasAppointments: boolean;
}

export interface ScheduleAppointment {
  id: string;
  dateIso: string;
  startMinutes: number;
  durationMinutes: number;
  timeLabel: string;
  status: AppointmentStatus;
  variant: AppointmentCardVariant;
  statusLabel: string;
  patientName: string;
  patientId: string;
  patientDocument: string;
  patientAge: number;
  patientAvatar: string;
  company: string;
  examType: string;
  doctorShort: string;
  doctorName: string;
  doctorInitials: string;
  searchText: string;
  observations: string;
}

export const SCHEDULE_GRID_START_HOUR = 8;
export const SCHEDULE_GRID_END_HOUR = 15;
export const SCHEDULE_HOUR_HEIGHT = 80;

const MONTH_NAMES = [
  'Enero',
  'Febrero',
  'Marzo',
  'Abril',
  'Mayo',
  'Junio',
  'Julio',
  'Agosto',
  'Septiembre',
  'Octubre',
  'Noviembre',
  'Diciembre',
];

const DAY_NAMES = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

function pad(value: number): string {
  return value.toString().padStart(2, '0');
}

export function toIsoDate(date: Date): string {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

export function parseIsoDate(iso: string): Date {
  const [year, month, day] = iso.split('-').map(Number);
  return new Date(year, month - 1, day);
}

export function isSameDay(a: Date, b: Date): boolean {
  return toIsoDate(a) === toIsoDate(b);
}

export function startOfWeek(date: Date): Date {
  const result = new Date(date);
  const weekday = result.getDay();
  const diff = weekday === 0 ? -6 : 1 - weekday;
  result.setDate(result.getDate() + diff);
  result.setHours(0, 0, 0, 0);
  return result;
}

export function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

export function addMonths(date: Date, months: number): Date {
  const result = new Date(date);
  result.setMonth(result.getMonth() + months);
  return result;
}

export function startOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

export function formatDayLabel(date: Date): string {
  return `${DAY_NAMES[date.getDay()]} ${date.getDate()}`;
}

export function formatTimeLabel(hour: number, minute: number): string {
  const period = hour >= 12 ? 'PM' : 'AM';
  const hour12 = hour % 12 || 12;
  return `${pad(hour12)}:${pad(minute)} ${period}`;
}

export function formatDateRange(start: Date, end: Date): string {
  const sameYear = start.getFullYear() === end.getFullYear();
  const sameMonth = sameYear && start.getMonth() === end.getMonth();

  if (sameMonth) {
    return `${MONTH_NAMES[start.getMonth()]} ${start.getDate()} — ${end.getDate()}, ${start.getFullYear()}`;
  }

  if (sameYear) {
    return `${MONTH_NAMES[start.getMonth()]} ${start.getDate()} — ${MONTH_NAMES[end.getMonth()]} ${end.getDate()}, ${start.getFullYear()}`;
  }

  return `${MONTH_NAMES[start.getMonth()]} ${start.getDate()}, ${start.getFullYear()} — ${MONTH_NAMES[end.getMonth()]} ${end.getDate()}, ${end.getFullYear()}`;
}

export function formatMonthTitle(date: Date): string {
  return `${MONTH_NAMES[date.getMonth()]} ${date.getFullYear()}`;
}

export function getVisibleDays(viewMode: ScheduleViewMode, anchorDate: Date): ScheduleDay[] {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (viewMode === 'day') {
    const day = new Date(anchorDate);
    day.setHours(0, 0, 0, 0);
    return [
      {
        iso: toIsoDate(day),
        label: formatDayLabel(day),
        isToday: isSameDay(day, today),
      },
    ];
  }

  const weekStart = startOfWeek(anchorDate);
  return Array.from({ length: 5 }, (_, index) => {
    const day = addDays(weekStart, index);
    return {
      iso: toIsoDate(day),
      label: formatDayLabel(day),
      isToday: isSameDay(day, today),
    };
  });
}

export function getMonthCells(anchorDate: Date, appointments: ScheduleAppointment[]): ScheduleMonthCell[] {
  const monthStart = startOfMonth(anchorDate);
  const gridStart = startOfWeek(monthStart);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return Array.from({ length: 42 }, (_, index) => {
    const day = addDays(gridStart, index);
    const iso = toIsoDate(day);
    const appointmentCount = appointments.filter((appointment) => appointment.dateIso === iso).length;

    return {
      iso,
      dayNumber: day.getDate(),
      isCurrentMonth: day.getMonth() === anchorDate.getMonth(),
      isToday: isSameDay(day, today),
      appointmentCount,
      hasAppointments: appointmentCount > 0,
    };
  });
}

export function appointmentTopOffset(startMinutes: number): number {
  const gridStart = SCHEDULE_GRID_START_HOUR * 60;
  return ((startMinutes - gridStart) / 60) * SCHEDULE_HOUR_HEIGHT;
}

export function appointmentHeightOffset(durationMinutes: number): number {
  return (durationMinutes / 60) * SCHEDULE_HOUR_HEIGHT;
}

export function getHourLabels(): string[] {
  return Array.from(
    { length: SCHEDULE_GRID_END_HOUR - SCHEDULE_GRID_START_HOUR + 1 },
    (_, index) => `${pad(SCHEDULE_GRID_START_HOUR + index)}:00`,
  );
}

export function matchesAppointmentSearch(appointment: ScheduleAppointment, query: string): boolean {
  if (!query.trim()) {
    return true;
  }

  const normalized = query.trim().toLowerCase();
  return appointment.searchText.toLowerCase().includes(normalized);
}

export function matchesAppointmentStatus(
  appointment: ScheduleAppointment,
  filter: AppointmentStatusFilter,
): boolean {
  if (filter === 'all') {
    return true;
  }

  return appointment.status === filter;
}

export function matchesAppointmentDoctor(
  appointment: ScheduleAppointment,
  doctorFilter: string,
): boolean {
  if (doctorFilter === 'all') {
    return true;
  }

  return appointment.doctorName === doctorFilter;
}

function buildAppointment(
  id: string,
  dateIso: string,
  hour: number,
  minute: number,
  status: AppointmentStatus,
  patientName: string,
  patientId: string,
  patientDocument: string,
  company: string,
  examType: string,
  doctorName: string,
  observations = '',
  durationMinutes = 20,
): ScheduleAppointment {
  const statusLabels: Record<AppointmentStatus, string> = {
    confirmed: 'Confirmada',
    pending: 'Pendiente',
    cancelled: 'Cancelada',
    'in-progress': 'En atención',
  };

  const variants: Record<AppointmentStatus, AppointmentCardVariant> = {
    confirmed: 'confirmed',
    pending: 'pending',
    cancelled: 'cancelled',
    'in-progress': 'in-progress',
  };

  const doctorInitials = doctorName
    .split(' ')
    .filter((part) => part.length > 1 && part !== 'Dr.' && part !== 'Dra.')
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('');

  return {
    id,
    dateIso,
    startMinutes: hour * 60 + minute,
    durationMinutes,
    timeLabel: formatTimeLabel(hour, minute),
    status,
    variant: variants[status],
    statusLabel: statusLabels[status],
    patientName,
    patientId,
    patientDocument,
    patientAge: 42,
    patientAvatar: '/images/illustrations/dashboard/patient-carlos-mendoza.svg',
    company,
    examType,
    doctorShort: `${doctorName.split(' ').slice(0, 2).join(' ')} S.`,
    doctorName,
    doctorInitials: doctorInitials || 'MS',
    searchText: `${patientName} ${company} ${doctorName} ${examType}`,
    observations,
  };
}

export interface AppointmentFormValue {
  id?: string;
  patientId: string;
  patientName: string;
  patientDocument: string;
  patientAvatar: string;
  company: string;
  doctorName: string;
  examType: string;
  dateIso: string;
  startTime: string;
  durationMinutes: number;
  observations: string;
}

export interface SchedulePatientOption {
  id: string;
  name: string;
  document: string;
  company: string;
  avatar: string;
}

export const SCHEDULE_PROFESSIONALS = [
  'Dra. Marina Silva',
  'Dr. Carlos Ruiz',
  'Dr. Andrés Mejía',
  'Dr. Marcos Soler',
  'Dra. Elena Rivas',
] as const;

export const SCHEDULE_EXAM_TYPES = [
  'Ingreso',
  'Examen Ingreso',
  'Periódico',
  'Periódico - Global',
  'Control periódico',
  'Control post-incapacidad',
  'Audiometría',
  'Espirometría',
  'Valoración ingreso',
  'Examen de egreso',
  'Examen periódico',
  'Valoración osteomuscular',
  'Optometría',
] as const;

export const SCHEDULE_DURATIONS = [20, 30, 45, 60] as const;

export const SCHEDULE_TIME_SLOTS = ['09:00', '09:15', '09:30', '09:45'] as const;

export const SCHEDULE_PATIENTS: SchedulePatientOption[] = [
  {
    id: '1',
    name: 'Carlos Eduardo Ruiz',
    document: '1.032.445.890',
    company: 'Tech Corp Solutions SAS',
    avatar: '/images/illustrations/dashboard/patient-carlos-mendoza.svg',
  },
  {
    id: '3',
    name: 'Juan David Morales',
    document: '1.045.221.908',
    company: 'LogiCorp Global',
    avatar: '/images/illustrations/dashboard/patient-carlos-mendoza.svg',
  },
  {
    id: '4',
    name: 'Beatriz Quiroga',
    document: '1.018.992.441',
    company: 'Globant Colombia',
    avatar: '/images/illustrations/dashboard/patient-elena-rodriguez.svg',
  },
  {
    id: '5',
    name: 'Sandra Vargas',
    document: '1.027.118.330',
    company: 'Constructora Bolívar S.A.',
    avatar: '/images/illustrations/dashboard/patient-sandra-vargas.svg',
  },
  {
    id: '6',
    name: 'Elena Rodríguez',
    document: '1.011.884.772',
    company: 'Ecopetrol S.A.',
    avatar: '/images/illustrations/dashboard/patient-elena-rodriguez.svg',
  },
];

export function createInitialAppointments(referenceDate = getDefaultAnchorDate()): ScheduleAppointment[] {
  const day = (offset: number): string => toIsoDate(addDays(referenceDate, offset));

  return [
  buildAppointment(
    'apt-001',
    day(-1),
    14,
    30,
    'cancelled',
    'Juan David Morales',
    '3',
    '1.045.221.908',
    'LogiCorp Global',
    'Control post-incapacidad',
    'Dr. Carlos Ruiz',
  ),
  buildAppointment(
    'apt-002',
    day(0),
    9,
    15,
    'confirmed',
    'Carlos Eduardo Ruiz',
    '1',
    '1.032.445.890',
    'Tech Corp Solutions SAS',
    'Examen Ingreso',
    'Dra. Marina Silva',
  ),
  buildAppointment(
    'apt-003',
    day(1),
    11,
    0,
    'in-progress',
    'Beatriz Quiroga',
    '4',
    '1.018.992.441',
    'Globant Colombia',
    'Periódico - Global',
    'Dr. Andrés Mejía',
  ),
  buildAppointment(
    'apt-004',
    day(2),
    10,
    0,
    'confirmed',
    'Sandra Vargas',
    '5',
    '1.027.118.330',
    'Constructora Bolívar S.A.',
    'Audiometría',
    'Dra. Marina Silva',
  ),
  buildAppointment(
    'apt-005',
    day(3),
    8,
    30,
    'pending',
    'Elena Rodríguez',
    '6',
    '1.011.884.772',
    'Ecopetrol S.A.',
    'Valoración ingreso',
    'Dr. Carlos Ruiz',
  ),
  buildAppointment(
    'apt-006',
    day(4),
    15,
    0,
    'confirmed',
    'Carlos Mendoza',
    '7',
    '1.009.441.215',
    'Tech Corp Solutions SAS',
    'Espirometría',
    'Dra. Elena Rivas',
  ),
  buildAppointment(
    'apt-007',
    day(7),
    9,
    0,
    'confirmed',
    'Carlos Eduardo Ruiz',
    '1',
    '1.032.445.890',
    'Tech Corp Solutions SAS',
    'Control periódico',
    'Dra. Marina Silva',
  ),
  buildAppointment(
    'apt-008',
    day(10),
    11,
    30,
    'pending',
    'María Fernanda López',
    '8',
    '1.055.902.118',
    'Servicios Mineros del Norte',
    'Examen de egreso',
    'Dr. Marcos Soler',
  ),
  buildAppointment(
    'apt-009',
    day(14),
    13,
    15,
    'confirmed',
    'Beatriz Quiroga',
    '4',
    '1.018.992.441',
    'Globant Colombia',
    'Optometría',
    'Dra. Marina Silva',
  ),
  buildAppointment(
    'apt-010',
    day(21),
    10,
    45,
    'confirmed',
    'Juan David Morales',
    '3',
    '1.045.221.908',
    'LogiCorp Global',
    'Examen periódico',
    'Dr. Carlos Ruiz',
  ),
  buildAppointment(
    'apt-011',
    day(28),
    9,
    30,
    'cancelled',
    'Sandra Vargas',
    '5',
    '1.027.118.330',
    'Constructora Bolívar S.A.',
    'Valoración osteomuscular',
    'Dr. Andrés Mejía',
  ),
  buildAppointment(
    'apt-012',
    day(35),
    14,
    0,
    'pending',
    'Elena Rodríguez',
    '6',
    '1.011.884.772',
    'Ecopetrol S.A.',
    'Examen de ingreso',
    'Dra. Elena Rivas',
  ),
  ];
}

export const SCHEDULE_APPOINTMENTS: ScheduleAppointment[] = createInitialAppointments();

export function minutesToTimeValue(startMinutes: number): string {
  const hour = Math.floor(startMinutes / 60);
  const minute = startMinutes % 60;
  return `${pad(hour)}:${pad(minute)}`;
}

export function parseTimeValue(value: string): { hour: number; minute: number } {
  const [hour, minute] = value.split(':').map(Number);
  return { hour: hour || 0, minute: minute || 0 };
}

export function hasScheduleConflict(
  appointments: ScheduleAppointment[],
  doctorName: string,
  dateIso: string,
  startMinutes: number,
  excludeId?: string,
): boolean {
  return appointments.some(
    (appointment) =>
      appointment.id !== excludeId &&
      appointment.status !== 'cancelled' &&
      appointment.doctorName === doctorName &&
      appointment.dateIso === dateIso &&
      appointment.startMinutes === startMinutes,
  );
}

export function buildFormFromAppointment(appointment: ScheduleAppointment): AppointmentFormValue {
  return {
    id: appointment.id,
    patientId: appointment.patientId,
    patientName: appointment.patientName,
    patientDocument: appointment.patientDocument,
    patientAvatar: appointment.patientAvatar,
    company: appointment.company,
    doctorName: appointment.doctorName,
    examType: appointment.examType,
    dateIso: appointment.dateIso,
    startTime: minutesToTimeValue(appointment.startMinutes),
    durationMinutes: appointment.durationMinutes,
    observations: appointment.observations,
  };
}

export function buildDefaultForm(defaultDateIso: string): AppointmentFormValue {
  const patient = SCHEDULE_PATIENTS[0];
  return {
    patientId: patient.id,
    patientName: patient.name,
    patientDocument: patient.document,
    patientAvatar: patient.avatar,
    company: patient.company,
    doctorName: SCHEDULE_PROFESSIONALS[0],
    examType: SCHEDULE_EXAM_TYPES[0],
    dateIso: defaultDateIso,
    startTime: '09:00',
    durationMinutes: SCHEDULE_DURATIONS[0],
    observations: '',
  };
}

export function appointmentFromForm(form: AppointmentFormValue, id: string): ScheduleAppointment {
  const { hour, minute } = parseTimeValue(form.startTime);
  const created = buildAppointment(
    id,
    form.dateIso,
    hour,
    minute,
    'confirmed',
    form.patientName,
    form.patientId,
    form.patientDocument,
    form.company,
    form.examType,
    form.doctorName,
    form.observations,
    form.durationMinutes,
  );

  return {
    ...created,
    patientAvatar: form.patientAvatar,
  };
}

export function updateAppointmentFromForm(
  existing: ScheduleAppointment,
  form: AppointmentFormValue,
): ScheduleAppointment {
  const { hour, minute } = parseTimeValue(form.startTime);
  const updated = buildAppointment(
    existing.id,
    form.dateIso,
    hour,
    minute,
    existing.status === 'cancelled' ? 'confirmed' : existing.status,
    form.patientName,
    form.patientId,
    form.patientDocument,
    form.company,
    form.examType,
    form.doctorName,
    form.observations,
    form.durationMinutes,
  );

  return {
    ...updated,
    patientAvatar: form.patientAvatar,
  };
}

export function createAppointmentId(): string {
  return `apt-${Date.now()}`;
}

export function cancelScheduleAppointment(appointment: ScheduleAppointment): ScheduleAppointment {
  return {
    ...appointment,
    status: 'cancelled',
    variant: 'cancelled',
    statusLabel: 'Cancelada',
  };
}

export function getDefaultAnchorDate(): Date {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today;
}

export function createScheduleBootstrap(): {
  anchorDate: Date;
  appointments: ScheduleAppointment[];
  selectedAppointmentId: string | null;
} {
  const anchorDate = getDefaultAnchorDate();
  const appointments = createInitialAppointments(anchorDate);
  const todayIso = toIsoDate(anchorDate);
  const selectedAppointmentId =
    appointments.find((appointment) => appointment.dateIso === todayIso)?.id ??
    appointments[0]?.id ??
    null;

  return { anchorDate, appointments, selectedAppointmentId };
}
