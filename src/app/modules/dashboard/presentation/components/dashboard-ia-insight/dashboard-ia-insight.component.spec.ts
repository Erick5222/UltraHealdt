import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardIaInsightComponent } from './dashboard-ia-insight.component';

describe('DashboardIaInsightComponent', () => {
  let component: DashboardIaInsightComponent;
  let fixture: ComponentFixture<DashboardIaInsightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardIaInsightComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardIaInsightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
