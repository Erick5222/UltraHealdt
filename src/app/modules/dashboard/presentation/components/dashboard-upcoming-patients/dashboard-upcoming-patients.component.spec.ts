import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardUpcomingPatientsComponent } from './dashboard-upcoming-patients.component';

describe('DashboardUpcomingPatientsComponent', () => {
  let component: DashboardUpcomingPatientsComponent;
  let fixture: ComponentFixture<DashboardUpcomingPatientsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardUpcomingPatientsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardUpcomingPatientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
