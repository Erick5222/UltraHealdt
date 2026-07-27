export type PatientProfileTabId =
  | 'resumen'
  | 'historia-clinica'
  | 'atenciones'
  | 'examenes'
  | 'documentos'
  | 'restricciones';

export interface PatientProfileTab {
  id: PatientProfileTabId;
  label: string;
}

export const PATIENT_PROFILE_TABS: PatientProfileTab[] = [
  { id: 'resumen', label: 'Resumen' },
  { id: 'historia-clinica', label: 'Historia Clínica' },
  { id: 'atenciones', label: 'Atenciones' },
  { id: 'examenes', label: 'Exámenes' },
  { id: 'documentos', label: 'Documentos' },
  { id: 'restricciones', label: 'Restricciones' },
];

export type PatientProfileSectionId = Exclude<PatientProfileTabId, 'resumen'>;
