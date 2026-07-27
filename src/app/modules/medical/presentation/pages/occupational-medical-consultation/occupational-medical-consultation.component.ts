import { Component } from '@angular/core';
import { AiAssistantPanelComponent } from '../../components/ai-assistant-panel/ai-assistant-panel.component';
import { ChangeHistoryPanelComponent } from '../../components/change-history-panel/change-history-panel.component';
import { ComplementaryExamsComponent } from '../../components/complementary-exams/complementary-exams.component';
import { ConsultationActionBarComponent } from '../../components/consultation-action-bar/consultation-action-bar.component';
import { ConsultationHeaderComponent } from '../../components/consultation-header/consultation-header.component';
import { ConsultationReasonBackgroundComponent } from '../../components/consultation-reason-background/consultation-reason-background.component';
import { DiagnosisPanelComponent } from '../../components/diagnosis-panel/diagnosis-panel.component';
import { FitnessConceptComponent } from '../../components/fitness-concept/fitness-concept.component';
import { PhysicalExaminationComponent } from '../../components/physical-examination/physical-examination.component';
import { RestrictionsRecommendationsComponent } from '../../components/restrictions-recommendations/restrictions-recommendations.component';
import { VitalSignsComponent } from '../../components/vital-signs/vital-signs.component';

@Component({
  selector: 'uh-occupational-medical-consultation',
  standalone: true,
  imports: [
    ConsultationHeaderComponent,
    FitnessConceptComponent,
    VitalSignsComponent,
    ConsultationReasonBackgroundComponent,
    PhysicalExaminationComponent,
    DiagnosisPanelComponent,
    RestrictionsRecommendationsComponent,
    ComplementaryExamsComponent,
    ConsultationActionBarComponent,
    AiAssistantPanelComponent,
    ChangeHistoryPanelComponent,
  ],
  templateUrl: './occupational-medical-consultation.component.html',
  styleUrl: './occupational-medical-consultation.component.scss',
})
export class OccupationalMedicalConsultationComponent {}
