import { Component, input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { PATIENT_PROFILE_TABS } from '../../pages/patient-profile/patient-profile.config';

@Component({
  selector: 'uh-patient-profile-tabs',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './patient-profile-tabs.component.html',
  styleUrl: './patient-profile-tabs.component.scss',
})
export class PatientProfileTabsComponent {
  patientId = input.required<string>();

  protected readonly tabs = PATIENT_PROFILE_TABS;

  protected tabRoute(tabId: string): string[] {
    return ['/patients', this.patientId(), tabId];
  }
}
