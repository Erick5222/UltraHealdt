import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardRecentReportsComponent } from './dashboard-recent-reports.component';

describe('DashboardRecentReportsComponent', () => {
  let component: DashboardRecentReportsComponent;
  let fixture: ComponentFixture<DashboardRecentReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardRecentReportsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardRecentReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
