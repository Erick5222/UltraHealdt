import { Component, ElementRef, input, output, viewChild } from '@angular/core';
import {
  ReportsFilterOption,
  ReportsFilterState,
} from '../../pages/reports/reports.config';

@Component({
  selector: 'uh-reports-filters',
  standalone: true,
  templateUrl: './reports-filters.component.html',
  styleUrl: './reports-filters.component.scss',
})
export class ReportsFiltersComponent {
  private readonly dateStartInput = viewChild<ElementRef<HTMLInputElement>>('dateStartInput');

  filters = input.required<ReportsFilterState>();
  dateRangeLabel = input.required<string>();
  statusLabel = input.required<string>();
  companyOptions = input.required<ReportsFilterOption[]>();
  doctorOptions = input.required<ReportsFilterOption[]>();
  examTypeOptions = input.required<ReportsFilterOption[]>();

  dateStartChange = output<string>();
  dateEndChange = output<string>();
  companyChange = output<string>();
  doctorChange = output<string>();
  examTypeChange = output<string>();
  statusCycle = output<void>();

  protected openDatePicker(): void {
    const input = this.dateStartInput()?.nativeElement;
    input?.focus();
    input?.showPicker?.();
  }
}
