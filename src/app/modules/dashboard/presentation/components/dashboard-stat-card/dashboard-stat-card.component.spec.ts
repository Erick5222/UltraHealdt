import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardStatCardComponent } from './dashboard-stat-card.component';

describe('DashboardStatCardComponent', () => {
  let component: DashboardStatCardComponent;
  let fixture: ComponentFixture<DashboardStatCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardStatCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardStatCardComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('icon', '/images/icons/Dashboard/Date.svg');
    fixture.componentRef.setInput('label', 'Citas del Día');
    fixture.componentRef.setInput('value', '48');
    fixture.componentRef.setInput('badge', 'Hoy');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
