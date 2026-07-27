import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardUpcomingPatientRowComponent } from './dashboard-upcoming-patient-row.component';

describe('DashboardUpcomingPatientRowComponent', () => {
  let component: DashboardUpcomingPatientRowComponent;
  let fixture: ComponentFixture<DashboardUpcomingPatientRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardUpcomingPatientRowComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardUpcomingPatientRowComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('avatar', '/images/illustrations/dashboard/patient-elena-rodriguez.svg');
    fixture.componentRef.setInput('name', 'Elena Rodríguez García');
    fixture.componentRef.setInput('examType', 'Examen Periódico');
    fixture.componentRef.setInput('company', 'Grupo Sura');
    fixture.componentRef.setInput('time', '08:30 AM');
    fixture.componentRef.setInput('status', 'waiting');
    fixture.componentRef.setInput('statusLabel', 'En espera');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
