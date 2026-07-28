import { Injectable, computed, signal } from '@angular/core';
import {
  DEFAULT_REPORTS_FILTERS,
  ReportsDashboardView,
  ReportsFilterState,
  buildReportsDashboardView,
} from '../pages/reports/reports.config';

@Injectable({ providedIn: 'root' })
export class ReportsStateService {
  private readonly filters = signal<ReportsFilterState>({ ...DEFAULT_REPORTS_FILTERS });
  private readonly iaInsightVisible = signal(true);

  readonly filterState = this.filters.asReadonly();
  readonly dashboardView = computed<ReportsDashboardView>(() =>
    buildReportsDashboardView(this.filters()),
  );
  readonly iaInsightVisibleState = this.iaInsightVisible.asReadonly();

  updateFilters(partial: Partial<ReportsFilterState>): void {
    this.filters.update((current) => ({ ...current, ...partial }));
  }

  cycleStatusFilter(): void {
    const order = ['completed', 'pending', 'cancelled', 'all'];
    this.filters.update((current) => {
      const currentIndex = order.indexOf(current.status);
      const nextStatus = order[(currentIndex + 1) % order.length];
      return { ...current, status: nextStatus };
    });
  }

  dismissIaInsight(): void {
    this.iaInsightVisible.set(false);
  }

  restoreIaInsight(): void {
    this.iaInsightVisible.set(true);
  }
}
