import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { PatientProfileSectionId } from '../patient-profile/patient-profile.config';

@Component({
  selector: 'uh-patient-profile-section',
  standalone: true,
  templateUrl: './patient-profile-section.component.html',
  styleUrl: './patient-profile-section.component.scss',
})
export class PatientProfileSectionComponent {
  private readonly route = inject(ActivatedRoute);

  protected readonly section = toSignal(
    this.route.data.pipe(map((data) => data['section'] as PatientProfileSectionId)),
    { initialValue: 'historia-clinica' as PatientProfileSectionId },
  );

  protected readonly showUploadPanel = toSignal(
    this.route.queryParamMap.pipe(map((params) => params.get('upload') === '1')),
    { initialValue: false },
  );

  protected readonly showConsultationPanel = toSignal(
    this.route.queryParamMap.pipe(map((params) => params.get('new') === '1')),
    { initialValue: false },
  );

  protected readonly sectionTitle = computed(() => {
    switch (this.section()) {
      case 'historia-clinica':
        return 'Historia Clínica';
      case 'atenciones':
        return 'Atenciones';
      case 'examenes':
        return 'Exámenes';
      case 'documentos':
        return 'Documentos';
      case 'restricciones':
        return 'Restricciones';
      default:
        return '';
    }
  });
}
