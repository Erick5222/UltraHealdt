import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { getPatientById } from '../patients-list/patients-list.config';

@Component({
  selector: 'uh-patient-profile-summary',
  standalone: true,
  templateUrl: './patient-profile-summary.component.html',
  styleUrl: './patient-profile-summary.component.scss',
})
export class PatientProfileSummaryComponent {
  private readonly route = inject(ActivatedRoute);

  private readonly patientId = toSignal(
    this.route.parent!.paramMap.pipe(map((params) => params.get('id'))),
    { initialValue: null },
  );

  protected readonly patient = computed(() => {
    const id = this.patientId();
    return id ? getPatientById(id) : null;
  });

  protected readonly birthDate = computed(() => this.patient()?.birthDate ?? '15/05/1982');
  protected readonly gender = computed(() =>
    this.patient()?.gender === 'female' ? 'Femenino' : 'Masculino',
  );
  protected readonly bloodType = computed(() => {
    const detail = this.patient();
    if (!detail) {
      return 'O Positivo (O+)';
    }

    const rhSymbol = detail.rh.includes('+') ? '+' : '-';
    const rhLabel = detail.rh.includes('Negativo') ? 'Negativo' : 'Positivo';
    return `${detail.bloodType} ${rhLabel} (${detail.bloodType}${rhSymbol})`;
  });
  protected readonly phone = computed(() => this.patient()?.phone ?? '+57 310 892 4455');
  protected readonly email = computed(() => this.patient()?.email ?? 'j.rodriguez@constructora.com');
  protected readonly address = computed(
    () => this.patient()?.address ?? 'Calle 127 # 45 - 22, Torre 3 Apt 401, Bogotá D.C.',
  );
  protected readonly hireDate = computed(() => this.patient()?.hireDate ?? '12/03/2018');
  protected readonly contractType = computed(() => this.patient()?.contractType ?? 'Indefinido');
  protected readonly department = computed(() => this.patient()?.department ?? 'Operaciones');
  protected readonly eps = computed(() => this.patient()?.eps ?? 'Sanitas S.A.');
  protected readonly arl = computed(() => this.patient()?.arl ?? 'Sura Riesgos Profesionales');
  protected readonly emergencyName = computed(
    () => this.patient()?.emergencyName ?? 'Martha Lucia Gómez',
  );
  protected readonly emergencyRelationship = computed(
    () => this.patient()?.emergencyRelationship ?? 'Cónyuge',
  );
  protected readonly emergencyPhone = computed(
    () => this.patient()?.emergencyPhone ?? '+57 311 456 7890',
  );
}
