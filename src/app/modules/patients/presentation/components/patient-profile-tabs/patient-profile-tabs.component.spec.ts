import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PatientProfileTabsComponent } from './patient-profile-tabs.component';

describe('PatientProfileTabsComponent', () => {
  let component: PatientProfileTabsComponent;
  let fixture: ComponentFixture<PatientProfileTabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatientProfileTabsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PatientProfileTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
