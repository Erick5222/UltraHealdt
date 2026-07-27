import { Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PatientDetail } from '../../pages/patients-list/patients-list.config';

@Component({
  selector: 'uh-patient-profile-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './patient-profile-header.component.html',
  styleUrl: './patient-profile-header.component.scss',
})
export class PatientProfileHeaderComponent {
  patientId = input.required<string>();
  patient = input<PatientDetail | null>(null);

  protected readonly displayName = computed(() => this.patient()?.name ?? 'Juan Pablo Rodríguez');
  protected readonly displayRole = computed(() => this.patient()?.role ?? 'SUPERVISOR DE OBRA');
  protected readonly displayDocument = computed(
    () => `${this.patient()?.documentType ?? 'CC'}: ${this.patient()?.document ?? '1.023.456.789'}`,
  );
  protected readonly displayCompany = computed(
    () => this.patient()?.company ?? 'Constructora Bolívar S.A.',
  );
  protected readonly isActive = computed(() => (this.patient()?.status ?? 'active') === 'active');
  protected readonly statusLabel = computed(() => (this.isActive() ? 'Activo' : 'Inactivo'));

  protected editRoute(): string[] {
    return ['/patients', this.patientId(), 'edit'];
  }

  protected uploadDocumentRoute(): string[] {
    return ['/patients', this.patientId(), 'documentos'];
  }

  protected newConsultationRoute(): string[] {
    return ['/patients', this.patientId(), 'atenciones'];
  }
}
