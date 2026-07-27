import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'uh-medical-history-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './medical-history-header.component.html',
  styleUrl: './medical-history-header.component.scss',
})
export class MedicalHistoryHeaderComponent {
  patientId = input.required<string>();

  protected newEntryRoute(): string[] {
    return ['/patients', this.patientId(), 'atenciones'];
  }

  protected printSummary(): void {
    window.print();
  }
}
