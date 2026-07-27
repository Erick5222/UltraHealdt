import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardRecentReportRowComponent } from './dashboard-recent-report-row.component';

describe('DashboardRecentReportRowComponent', () => {
  let component: DashboardRecentReportRowComponent;
  let fixture: ComponentFixture<DashboardRecentReportRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardRecentReportRowComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardRecentReportRowComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('icon', '/images/icons/Dashboard/analisis.svg');
    fixture.componentRef.setInput('title', 'Análisis Epidemioló...');
    fixture.componentRef.setInput('generatedAt', 'GENERADO HACE 2H');
    fixture.componentRef.setInput('iconTone', 'danger');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
