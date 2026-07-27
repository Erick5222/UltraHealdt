export type MedicalHistoryStatus = 'validated' | 'archived';
export type MedicalHistoryAptitude = 'fit' | 'restricted';

export interface MedicalHistoryRecord {
  id: string;
  dateLabel: string;
  dateIso: string;
  title: string;
  registryId: string;
  professionalName: string;
  professionalRole: string;
  company: string;
  status: MedicalHistoryStatus;
  aptitude: MedicalHistoryAptitude;
  aptitudeLabel: string;
  summary?: string;
  examType: string;
  doctor: string;
  showResults: boolean;
}

export interface MedicalHistoryFilters {
  dateFrom: string;
  dateTo: string;
  examType: string;
  doctor: string;
  status: '' | MedicalHistoryStatus;
  aptitude: '' | MedicalHistoryAptitude;
}

export const DEFAULT_MEDICAL_HISTORY_FILTERS: MedicalHistoryFilters = {
  dateFrom: '',
  dateTo: '',
  examType: '',
  doctor: '',
  status: '',
  aptitude: '',
};

export const MEDICAL_HISTORY_EXAM_TYPES = [
  'Examen Periódico',
  'Valoración Osteomuscular',
  'Examen de Ingreso',
  'Audiometría',
  'Espirometría',
] as const;

export const MEDICAL_HISTORY_DOCTORS = ['Dra. Elena Rivas', 'Dr. Marcos Soler', 'Dr. Andrés Mejía'] as const;

export const MEDICAL_HISTORY_INITIAL_VISIBLE = 3;

export const MEDICAL_HISTORY_RECORDS: MedicalHistoryRecord[] = [
  {
    id: '88291-p',
    dateLabel: '24 OCT 2023',
    dateIso: '2023-10-24',
    title: 'Examen Periódico de Control',
    registryId: '#88291-P',
    professionalName: 'Dra. Elena Rivas',
    professionalRole: 'Especialista en Medicina del Trabajo',
    company: 'TechLogistics S.A.S.',
    status: 'validated',
    aptitude: 'restricted',
    aptitudeLabel: 'APTO CON RESTRICCIONES',
    summary:
      'Paciente presenta buena condición general. Se identifica fatiga visual leve por uso prolongado de pantallas. Se recomienda pausas activas cada 2 horas y uso de lentes de descanso.',
    examType: 'Examen Periódico',
    doctor: 'Dra. Elena Rivas',
    showResults: true,
  },
  {
    id: '77102-o',
    dateLabel: '12 JUN 2023',
    dateIso: '2023-06-12',
    title: 'Valoración Osteomuscular',
    registryId: '#77102-O',
    professionalName: 'Dr. Marcos Soler',
    professionalRole: 'Fisioterapeuta Ocupacional',
    company: 'TechLogistics S.A.S.',
    status: 'validated',
    aptitude: 'fit',
    aptitudeLabel: 'APTO',
    examType: 'Valoración Osteomuscular',
    doctor: 'Dr. Marcos Soler',
    showResults: false,
  },
  {
    id: '11029-i',
    dateLabel: '15 ENE 2022',
    dateIso: '2022-01-15',
    title: 'Examen de Ingreso',
    registryId: '#11029-I',
    professionalName: 'Dra. Elena Rivas',
    professionalRole: 'Especialista en Medicina del Trabajo',
    company: 'LogiCorp Global',
    status: 'archived',
    aptitude: 'fit',
    aptitudeLabel: 'APTO',
    examType: 'Examen de Ingreso',
    doctor: 'Dra. Elena Rivas',
    showResults: false,
  },
  {
    id: '55201-a',
    dateLabel: '03 NOV 2021',
    dateIso: '2021-11-03',
    title: 'Audiometría Ocupacional',
    registryId: '#55201-A',
    professionalName: 'Dr. Andrés Mejía',
    professionalRole: 'Audiólogo Clínico',
    company: 'LogiCorp Global',
    status: 'archived',
    aptitude: 'fit',
    aptitudeLabel: 'APTO',
    examType: 'Audiometría',
    doctor: 'Dr. Andrés Mejía',
    showResults: true,
  },
  {
    id: '44118-e',
    dateLabel: '18 AGO 2020',
    dateIso: '2020-08-18',
    title: 'Espirometría Basal',
    registryId: '#44118-E',
    professionalName: 'Dra. Elena Rivas',
    professionalRole: 'Especialista en Medicina del Trabajo',
    company: 'LogiCorp Global',
    status: 'archived',
    aptitude: 'fit',
    aptitudeLabel: 'APTO',
    examType: 'Espirometría',
    doctor: 'Dra. Elena Rivas',
    showResults: false,
  },
];

export function matchesMedicalHistoryDateRange(record: MedicalHistoryRecord, from: string, to: string): boolean {
  if (from && record.dateIso < from) {
    return false;
  }

  if (to && record.dateIso > to) {
    return false;
  }

  return true;
}

export function filterMedicalHistoryRecords(
  records: MedicalHistoryRecord[],
  filters: MedicalHistoryFilters,
): MedicalHistoryRecord[] {
  return records.filter((record) => {
    if (!matchesMedicalHistoryDateRange(record, filters.dateFrom, filters.dateTo)) {
      return false;
    }

    if (filters.examType && record.examType !== filters.examType) {
      return false;
    }

    if (filters.doctor && record.doctor !== filters.doctor) {
      return false;
    }

    if (filters.status && record.status !== filters.status) {
      return false;
    }

    if (filters.aptitude && record.aptitude !== filters.aptitude) {
      return false;
    }

    return true;
  });
}

export function hasActiveMedicalHistoryFilters(filters: MedicalHistoryFilters): boolean {
  return Boolean(
    filters.dateFrom ||
      filters.dateTo ||
      filters.examType ||
      filters.doctor ||
      filters.status ||
      filters.aptitude,
  );
}
