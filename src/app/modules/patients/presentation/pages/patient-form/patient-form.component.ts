import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map } from 'rxjs';
import { getPatientById, PatientDetail } from '../patients-list/patients-list.config';

@Component({
  selector: 'uh-patient-form',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './patient-form.component.html',
  styleUrl: './patient-form.component.scss',
})
export class PatientFormComponent {
  private readonly route = inject(ActivatedRoute);

  private readonly patientId = toSignal(
    this.route.paramMap.pipe(map((params) => params.get('id'))),
    { initialValue: null },
  );

  private readonly isViewMode = toSignal(
    this.route.url.pipe(map((segments) => segments.some((segment) => segment.path === 'view'))),
    { initialValue: false },
  );

  protected readonly isReadOnly = computed(() => this.isViewMode());
  protected readonly isEditMode = computed(() => Boolean(this.patientId()) && !this.isReadOnly());

  protected readonly patient = computed<PatientDetail | null>(() => {
    const id = this.patientId();
    if (!id) {
      return null;
    }

    return getPatientById(id);
  });

  protected readonly pageTitle = computed(() => {
    if (this.isReadOnly()) {
      return 'Información del Paciente';
    }

    if (this.isEditMode()) {
      return 'Editar Paciente';
    }

    return 'Crear Nuevo Paciente';
  });

  protected editPatientRoute(): string[] {
    const id = this.patientId();
    return id ? ['/patients', id, 'edit'] : ['/patients'];
  }

  protected isGenderSelected(gender: PatientDetail['gender']): boolean {
    return this.patient()?.gender === gender;
  }

  protected isOptionSelected(value: string, expected: string): boolean {
    return value === expected;
  }
}
