import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReportsFiltersComponent } from '../../components/reports-filters/reports-filters.component';
import { ReportsHeaderComponent } from '../../components/reports-header/reports-header.component';
import { ReportsIaInsightComponent } from '../../components/reports-ia-insight/reports-ia-insight.component';
import { ReportsIncomeProjectionsComponent } from '../../components/reports-income-projections/reports-income-projections.component';
import { ReportsMedicalProductivityComponent } from '../../components/reports-medical-productivity/reports-medical-productivity.component';
import { ReportsOccupancyChartComponent } from '../../components/reports-occupancy-chart/reports-occupancy-chart.component';
import { ReportsSummaryComponent } from '../../components/reports-summary/reports-summary.component';
import { ReportsTopCompaniesComponent } from '../../components/reports-top-companies/reports-top-companies.component';
import { ReportsStateService } from '../../services/reports-state.service';
import {
  REPORTS_COMPANY_OPTIONS,
  REPORTS_DOCTOR_OPTIONS,
  REPORTS_EXAM_TYPE_OPTIONS,
  exportReportsDashboardToPdf,
  formatReportsDateRange,
  getReportsStatusLabel,
  shareReportsDashboardView,
} from './reports.config';

@Component({
  selector: 'uh-reports',
  standalone: true,
  imports: [
    ReportsHeaderComponent,
    ReportsFiltersComponent,
    ReportsSummaryComponent,
    ReportsOccupancyChartComponent,
    ReportsTopCompaniesComponent,
    ReportsMedicalProductivityComponent,
    ReportsIncomeProjectionsComponent,
    ReportsIaInsightComponent,
  ],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.scss',
})
export class ReportsComponent implements OnInit {
  private readonly reportsState = inject(ReportsStateService);
  private readonly route = inject(ActivatedRoute);

  protected readonly actionMessage = signal<string | null>(null);
  protected readonly companyOptions = REPORTS_COMPANY_OPTIONS;
  protected readonly doctorOptions = REPORTS_DOCTOR_OPTIONS;
  protected readonly examTypeOptions = REPORTS_EXAM_TYPE_OPTIONS;

  protected readonly filters = computed(() => this.reportsState.filterState());
  protected readonly dashboardView = computed(() => this.reportsState.dashboardView());
  protected readonly showIaInsight = computed(() => this.reportsState.iaInsightVisibleState());

  protected readonly dateRangeLabel = computed(() =>
    formatReportsDateRange(this.filters().dateStart, this.filters().dateEnd),
  );

  protected readonly statusLabel = computed(() => getReportsStatusLabel(this.filters().status));

  ngOnInit(): void {
    const params = this.route.snapshot.queryParamMap;
    const sharedFilters = {
      dateStart: params.get('from') ?? undefined,
      dateEnd: params.get('to') ?? undefined,
      company: params.get('company') ?? undefined,
      doctor: params.get('doctor') ?? undefined,
      examType: params.get('exam') ?? undefined,
      status: params.get('status') ?? undefined,
    };

    const cleaned = Object.fromEntries(
      Object.entries(sharedFilters).filter(([, value]) => value !== undefined && value !== null),
    );

    if (Object.keys(cleaned).length) {
      this.reportsState.updateFilters(cleaned);
    }
  }

  protected onDateStartChange(value: string): void {
    if (!value) {
      return;
    }

    const nextEnd =
      value > this.filters().dateEnd ? value : this.filters().dateEnd;

    this.reportsState.updateFilters({ dateStart: value, dateEnd: nextEnd });
    this.setActionMessage('Rango de fechas actualizado.');
  }

  protected onDateEndChange(value: string): void {
    if (!value) {
      return;
    }

    const nextStart =
      value < this.filters().dateStart ? value : this.filters().dateStart;

    this.reportsState.updateFilters({ dateStart: nextStart, dateEnd: value });
    this.setActionMessage('Rango de fechas actualizado.');
  }

  protected onCompanyChange(value: string): void {
    this.reportsState.updateFilters({ company: value });
    this.setActionMessage('Filtro de empresa aplicado.');
  }

  protected onDoctorChange(value: string): void {
    this.reportsState.updateFilters({ doctor: value });
    this.setActionMessage('Filtro de médico aplicado.');
  }

  protected onExamTypeChange(value: string): void {
    this.reportsState.updateFilters({ examType: value });
    this.setActionMessage('Tipo de examen actualizado.');
  }

  protected onStatusCycle(): void {
    this.reportsState.cycleStatusFilter();
    this.setActionMessage(`Estado filtrado: ${this.statusLabel()}.`);
  }

  protected onExportPdf(): void {
    const exported = exportReportsDashboardToPdf(this.filters(), this.dashboardView());
    this.setActionMessage(
      exported
        ? 'Exportación PDF iniciada. Revise la ventana de impresión.'
        : 'No se pudo abrir la exportación PDF. Verifique ventanas emergentes.',
    );
  }

  protected async onShareView(): Promise<void> {
    const shared = await shareReportsDashboardView(this.filters());
    this.setActionMessage(
      shared
        ? 'Vista compartida. Enlace copiado o enviado correctamente.'
        : 'No se pudo compartir la vista en este momento.',
    );
  }

  protected onViewProposal(): void {
    this.setActionMessage(
      'Propuesta IA: habilitar jornadas de Exámenes Exprés entre 12:00 y 14:00.',
    );
  }

  protected onDismissInsight(): void {
    this.reportsState.dismissIaInsight();
    this.setActionMessage('Insight de IA descartado.');
  }

  private setActionMessage(message: string): void {
    this.actionMessage.set(message);
    window.setTimeout(() => this.actionMessage.set(null), 4500);
  }
}
