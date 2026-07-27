import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OccupationalMedicalConsultationComponent } from './occupational-medical-consultation.component';

describe('OccupationalMedicalConsultationComponent', () => {
  let component: OccupationalMedicalConsultationComponent;
  let fixture: ComponentFixture<OccupationalMedicalConsultationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OccupationalMedicalConsultationComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(OccupationalMedicalConsultationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
