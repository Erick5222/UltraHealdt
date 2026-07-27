import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { map } from 'rxjs';
import { PatientProfileHeaderComponent } from '../../components/patient-profile-header/patient-profile-header.component';
import { PatientProfileTabsComponent } from '../../components/patient-profile-tabs/patient-profile-tabs.component';
import { getPatientById } from '../patients-list/patients-list.config';

@Component({
  selector: 'uh-patient-profile',
  standalone: true,
  imports: [RouterOutlet, PatientProfileHeaderComponent, PatientProfileTabsComponent],
  templateUrl: './patient-profile.component.html',
  styleUrl: './patient-profile.component.scss',
})
export class PatientProfileComponent {
  private readonly route = inject(ActivatedRoute);

  protected readonly patientId = toSignal(
    this.route.paramMap.pipe(map((params) => params.get('id'))),
    { initialValue: null },
  );

  protected readonly patient = computed(() => {
    const id = this.patientId();
    return id ? getPatientById(id) : null;
  });
}
