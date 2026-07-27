export type PatientAvatarTone = 'primary' | 'secondary' | 'tertiary' | 'quaternary';
export type PatientStatus = 'active' | 'inactive';
export type PatientGender = 'male' | 'female';
export type PatientStatusFilter = 'all' | 'active' | 'inactive';

export interface PatientListItem {
  id: string;
  documentType: string;
  document: string;
  name: string;
  avatarInitial: string;
  avatarTone: PatientAvatarTone;
  company: string;
  role: string;
  status: PatientStatus;
  lastVisit: string;
  lastVisitDate: string;
  phone: string;
}

export interface PatientDetail extends PatientListItem {
  documentTypeLabel: string;
  firstName: string;
  middleName: string;
  lastName: string;
  secondLastName: string;
  birthDate: string;
  gender: PatientGender;
  landline: string;
  email: string;
  department: string;
  hireDate: string;
  contractType: string;
  observations: string;
  bloodType: string;
  rh: string;
  eps: string;
  arl: string;
  country: string;
  state: string;
  city: string;
  address: string;
  emergencyName: string;
  emergencyRelationship: string;
  emergencyPhone: string;
}

export const PATIENTS_LIST_PAGE_SIZE = 10;
export const PATIENTS_LIST_TOTAL = 1240;

interface PatientTemplate extends Omit<PatientDetail, 'id' | 'document'> {}

export const PATIENT_FILTER_COMPANIES = [
  'TechNova Solutions',
  'Bancolombia',
  'Grupo Éxito',
  'EPM',
  'ISA Intercol',
  'Grupo Argos',
  'Nutresa',
  'Cemex Colombia',
  'Sura',
  'Postobón',
] as const;

const PATIENTS_DETAIL_TEMPLATES: PatientTemplate[] = [
  {
    documentType: 'CC',
    documentTypeLabel: 'Cédula de Ciudadanía',
    name: 'Andrea Gómez',
    firstName: 'Andrea',
    middleName: '',
    lastName: 'Gómez',
    secondLastName: 'López',
    avatarInitial: 'A',
    avatarTone: 'primary',
    company: 'TechNova Solutions',
    role: 'Ingeniero de Sistemas',
    department: 'Tecnología',
    status: 'active',
    lastVisit: '12 Oct 2023',
    lastVisitDate: '2023-10-12',
    birthDate: '15/03/1992',
    gender: 'female',
    phone: '300 123 4567',
    landline: '604 444 0101',
    email: 'andrea.gomez@email.com',
    hireDate: '01/02/2020',
    contractType: 'Término Indefinido',
    observations: 'Paciente con controles periódicos por salud ocupacional.',
    bloodType: 'O',
    rh: 'Positivo (+)',
    eps: 'Sura EPS',
    arl: 'Sura ARL',
    country: 'Colombia',
    state: 'Antioquia',
    city: 'Medellín',
    address: 'Calle 45 # 23-10',
    emergencyName: 'Carlos Gómez',
    emergencyRelationship: 'Padre',
    emergencyPhone: '300 987 6543',
  },
  {
    documentType: 'CE',
    documentTypeLabel: 'Cédula de Extranjería',
    name: 'Miguel Ángel Castro',
    firstName: 'Miguel',
    middleName: 'Ángel',
    lastName: 'Castro',
    secondLastName: 'Ríos',
    avatarInitial: 'M',
    avatarTone: 'secondary',
    company: 'Bancolombia',
    role: 'Analista Financiero',
    department: 'Finanzas',
    status: 'active',
    lastVisit: '05 Sep 2023',
    lastVisitDate: '2023-09-05',
    birthDate: '22/07/1988',
    gender: 'male',
    phone: '310 456 7890',
    landline: '604 555 0202',
    email: 'miguel.castro@email.com',
    hireDate: '15/06/2019',
    contractType: 'Término Indefinido',
    observations: '',
    bloodType: 'A',
    rh: 'Positivo (+)',
    eps: 'Sanitas EPS',
    arl: 'Colmena ARL',
    country: 'Colombia',
    state: 'Antioquia',
    city: 'Envigado',
    address: 'Carrera 48 # 30-15',
    emergencyName: 'Lucía Castro',
    emergencyRelationship: 'Esposa',
    emergencyPhone: '311 222 3344',
  },
  {
    documentType: 'CC',
    documentTypeLabel: 'Cédula de Ciudadanía',
    name: 'Juan David Restrepo',
    firstName: 'Juan',
    middleName: 'David',
    lastName: 'Restrepo',
    secondLastName: 'Vélez',
    avatarInitial: 'J',
    avatarTone: 'tertiary',
    company: 'Grupo Éxito',
    role: 'Estudiante',
    department: 'Prácticas',
    status: 'inactive',
    lastVisit: '22 Jul 2023',
    lastVisitDate: '2023-07-22',
    birthDate: '10/11/2001',
    gender: 'male',
    phone: '320 111 2233',
    landline: '',
    email: 'juan.restrepo@email.com',
    hireDate: '01/01/2023',
    contractType: 'Término Fijo',
    observations: 'Práctica universitaria finalizada.',
    bloodType: 'B',
    rh: 'Negativo (-)',
    eps: 'Compensar EPS',
    arl: 'Positiva ARL',
    country: 'Colombia',
    state: 'Antioquia',
    city: 'Bello',
    address: 'Diagonal 55 # 12-40',
    emergencyName: 'María Restrepo',
    emergencyRelationship: 'Madre',
    emergencyPhone: '300 555 6677',
  },
  {
    documentType: 'TI',
    documentTypeLabel: 'Tarjeta de Identidad',
    name: 'Sofia Mejía',
    firstName: 'Sofia',
    middleName: '',
    lastName: 'Mejía',
    secondLastName: 'Cardona',
    avatarInitial: 'S',
    avatarTone: 'quaternary',
    company: 'EPM',
    role: 'Auxiliar Administrativo',
    department: 'Administración',
    status: 'active',
    lastVisit: '15 Oct 2023',
    lastVisitDate: '2023-10-15',
    birthDate: '04/05/2004',
    gender: 'female',
    phone: '315 888 9900',
    landline: '604 333 0404',
    email: 'sofia.mejia@email.com',
    hireDate: '10/03/2022',
    contractType: 'Término Indefinido',
    observations: '',
    bloodType: 'AB',
    rh: 'Positivo (+)',
    eps: 'Nueva EPS',
    arl: 'Sura ARL',
    country: 'Colombia',
    state: 'Antioquia',
    city: 'Medellín',
    address: 'Transversal 34 # 56-78',
    emergencyName: 'Pedro Mejía',
    emergencyRelationship: 'Padre',
    emergencyPhone: '312 444 5566',
  },
  {
    documentType: 'CC',
    documentTypeLabel: 'Cédula de Ciudadanía',
    name: 'Laura Camila Vélez',
    firstName: 'Laura',
    middleName: 'Camila',
    lastName: 'Vélez',
    secondLastName: 'Montoya',
    avatarInitial: 'L',
    avatarTone: 'primary',
    company: 'ISA Intercol',
    role: 'Enfermera Jefe',
    department: 'Salud Ocupacional',
    status: 'active',
    lastVisit: '02 Nov 2023',
    lastVisitDate: '2023-11-02',
    birthDate: '18/09/1985',
    gender: 'female',
    phone: '301 777 8899',
    landline: '604 222 0505',
    email: 'laura.velez@email.com',
    hireDate: '20/08/2017',
    contractType: 'Término Indefinido',
    observations: 'Responsable de brigadas de primeros auxilios.',
    bloodType: 'O',
    rh: 'Negativo (-)',
    eps: 'Sura EPS',
    arl: 'Colmena ARL',
    country: 'Colombia',
    state: 'Antioquia',
    city: 'Itagüí',
    address: 'Calle 80 # 45-20',
    emergencyName: 'Andrés Vélez',
    emergencyRelationship: 'Hermano',
    emergencyPhone: '318 666 7788',
  },
  {
    documentType: 'CC',
    documentTypeLabel: 'Cédula de Ciudadanía',
    name: 'Roberto Salazar',
    firstName: 'Roberto',
    middleName: '',
    lastName: 'Salazar',
    secondLastName: 'Duque',
    avatarInitial: 'R',
    avatarTone: 'secondary',
    company: 'Grupo Argos',
    role: 'Técnico de Campo',
    department: 'Operaciones',
    status: 'active',
    lastVisit: '18 Aug 2023',
    lastVisitDate: '2023-08-18',
    birthDate: '30/01/1990',
    gender: 'male',
    phone: '317 333 4455',
    landline: '',
    email: 'roberto.salazar@email.com',
    hireDate: '05/04/2021',
    contractType: 'Obra o Labor',
    observations: '',
    bloodType: 'A',
    rh: 'Negativo (-)',
    eps: 'Sanitas EPS',
    arl: 'Positiva ARL',
    country: 'Colombia',
    state: 'Antioquia',
    city: 'Sabaneta',
    address: 'Carrera 52 # 70-11',
    emergencyName: 'Diana Salazar',
    emergencyRelationship: 'Esposa',
    emergencyPhone: '314 555 6677',
  },
  {
    documentType: 'CC',
    documentTypeLabel: 'Cédula de Ciudadanía',
    name: 'Camila Torres',
    firstName: 'Camila',
    middleName: '',
    lastName: 'Torres',
    secondLastName: 'Giraldo',
    avatarInitial: 'C',
    avatarTone: 'tertiary',
    company: 'Nutresa',
    role: 'Coordinadora SST',
    department: 'Seguridad y Salud',
    status: 'active',
    lastVisit: '09 Jan 2024',
    lastVisitDate: '2024-01-09',
    birthDate: '12/12/1987',
    gender: 'female',
    phone: '319 444 5566',
    landline: '604 111 0606',
    email: 'camila.torres@email.com',
    hireDate: '11/11/2016',
    contractType: 'Término Indefinido',
    observations: 'Coordinadora principal de programas SST.',
    bloodType: 'B',
    rh: 'Positivo (+)',
    eps: 'Compensar EPS',
    arl: 'Sura ARL',
    country: 'Colombia',
    state: 'Antioquia',
    city: 'Medellín',
    address: 'Avenida 33 # 76-90',
    emergencyName: 'Felipe Torres',
    emergencyRelationship: 'Esposo',
    emergencyPhone: '300 222 3344',
  },
  {
    documentType: 'CE',
    documentTypeLabel: 'Cédula de Extranjería',
    name: 'Felipe Herrera',
    firstName: 'Felipe',
    middleName: '',
    lastName: 'Herrera',
    secondLastName: 'Mora',
    avatarInitial: 'F',
    avatarTone: 'quaternary',
    company: 'Cemex Colombia',
    role: 'Operario de Planta',
    department: 'Producción',
    status: 'inactive',
    lastVisit: '14 Mar 2023',
    lastVisitDate: '2023-03-14',
    birthDate: '08/06/1993',
    gender: 'male',
    phone: '316 777 8899',
    landline: '',
    email: 'felipe.herrera@email.com',
    hireDate: '22/02/2020',
    contractType: 'Término Fijo',
    observations: 'Contrato finalizado por proyecto.',
    bloodType: 'O',
    rh: 'Positivo (+)',
    eps: 'Nueva EPS',
    arl: 'Colmena ARL',
    country: 'Colombia',
    state: 'Antioquia',
    city: 'Rionegro',
    address: 'Vereda El Tablazo Km 3',
    emergencyName: 'Ana Herrera',
    emergencyRelationship: 'Madre',
    emergencyPhone: '313 888 9900',
  },
  {
    documentType: 'CC',
    documentTypeLabel: 'Cédula de Ciudadanía',
    name: 'Valentina Ruiz',
    firstName: 'Valentina',
    middleName: '',
    lastName: 'Ruiz',
    secondLastName: 'Pineda',
    avatarInitial: 'V',
    avatarTone: 'primary',
    company: 'Sura',
    role: 'Gestora Humana',
    department: 'Recursos Humanos',
    status: 'active',
    lastVisit: '27 Dec 2023',
    lastVisitDate: '2023-12-27',
    birthDate: '25/04/1991',
    gender: 'female',
    phone: '304 111 2233',
    landline: '604 777 0707',
    email: 'valentina.ruiz@email.com',
    hireDate: '03/07/2018',
    contractType: 'Término Indefinido',
    observations: '',
    bloodType: 'A',
    rh: 'Positivo (+)',
    eps: 'Sura EPS',
    arl: 'Sura ARL',
    country: 'Colombia',
    state: 'Antioquia',
    city: 'Medellín',
    address: 'Calle 10 # 43-50',
    emergencyName: 'Jorge Ruiz',
    emergencyRelationship: 'Padre',
    emergencyPhone: '320 444 5566',
  },
  {
    documentType: 'TI',
    documentTypeLabel: 'Tarjeta de Identidad',
    name: 'Daniel Ortiz',
    firstName: 'Daniel',
    middleName: '',
    lastName: 'Ortiz',
    secondLastName: 'Ramírez',
    avatarInitial: 'D',
    avatarTone: 'secondary',
    company: 'Postobón',
    role: 'Auxiliar Logístico',
    department: 'Logística',
    status: 'active',
    lastVisit: '03 Feb 2024',
    lastVisitDate: '2024-02-03',
    birthDate: '19/08/2003',
    gender: 'male',
    phone: '322 555 6677',
    landline: '',
    email: 'daniel.ortiz@email.com',
    hireDate: '14/01/2023',
    contractType: 'Prestación de Servicios',
    observations: '',
    bloodType: 'AB',
    rh: 'Negativo (-)',
    eps: 'Compensar EPS',
    arl: 'Positiva ARL',
    country: 'Colombia',
    state: 'Antioquia',
    city: 'La Estrella',
    address: 'Carrera 65 # 50-30',
    emergencyName: 'Claudia Ortiz',
    emergencyRelationship: 'Madre',
    emergencyPhone: '311 666 7788',
  },
];

export function buildPatientDetail(index: number): PatientDetail {
  const template = PATIENTS_DETAIL_TEMPLATES[index % PATIENTS_DETAIL_TEMPLATES.length];
  const sequence = index + 1;
  const document = formatPatientDocument(template.documentType === 'CC' ? '1.032.445.192' : 
    template.documentType === 'CE' ? '1.245.789.012' :
    template.documentType === 'TI' ? '1.098.765.432' : '987.654.321', sequence);

  return {
    ...template,
    id: String(sequence),
    document,
  };
}

export function buildPatientListItem(index: number): PatientListItem {
  const detail = buildPatientDetail(index);
  const { id, documentType, document, name, avatarInitial, avatarTone, company, role, status, lastVisit, lastVisitDate, phone } = detail;

  return { id, documentType, document, name, avatarInitial, avatarTone, company, role, status, lastVisit, lastVisitDate, phone };
}

export function getPatientById(id: string): PatientDetail | null {
  const index = Number(id) - 1;
  if (!Number.isInteger(index) || index < 0 || index >= PATIENTS_LIST_TOTAL) {
    return null;
  }

  return buildPatientDetail(index);
}

function formatPatientDocument(baseDocument: string, sequence: number): string {
  const digits = baseDocument.replace(/\D/g, '');
  const suffix = String(sequence).padStart(3, '0').slice(-3);
  const nextDigits = `${digits.slice(0, -3)}${suffix}`;

  return nextDigits.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

export function matchesPatientSearch(patient: PatientListItem, query: string): boolean {
  if (!query) {
    return true;
  }

  const normalizedQuery = normalizeSearchText(query);
  const haystack = [
    patient.documentType,
    patient.document,
    patient.name,
    patient.company,
    patient.role,
    patient.phone,
    patient.lastVisit,
  ]
    .join(' ')
    .toLowerCase();

  return normalizeSearchText(haystack).includes(normalizedQuery);
}

export function matchesPatientDateRange(
  patient: PatientListItem,
  from: string,
  to: string,
): boolean {
  if (!from && !to) {
    return true;
  }

  const visitDate = patient.lastVisitDate;

  if (from && visitDate < from) {
    return false;
  }

  if (to && visitDate > to) {
    return false;
  }

  return true;
}

function normalizeSearchText(value: string): string {
  return value.toLowerCase().replace(/[.\s-]/g, '');
}
