import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { PatientActionsMenuComponent } from './patient-actions-menu.component';

describe('PatientActionsMenuComponent', () => {
  let component: PatientActionsMenuComponent;
  let fixture: ComponentFixture<PatientActionsMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatientActionsMenuComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(PatientActionsMenuComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('patientId', '1');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
