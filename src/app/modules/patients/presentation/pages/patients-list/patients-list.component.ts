import { DecimalPipe } from '@angular/common';
import { Component, computed, HostListener, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PatientActionsMenuComponent } from '../../components/patient-actions-menu/patient-actions-menu.component';
import {
  buildPatientListItem,
  matchesPatientDateRange,
  matchesPatientSearch,
  PATIENT_FILTER_COMPANIES,
  PATIENTS_LIST_PAGE_SIZE,
  PATIENTS_LIST_TOTAL,
  PatientListItem,
  PatientStatusFilter,
} from './patients-list.config';

@Component({
  selector: 'uh-patients-list',
  standalone: true,
  imports: [DecimalPipe, RouterLink, PatientActionsMenuComponent],
  templateUrl: './patients-list.component.html',
  styleUrl: './patients-list.component.scss',
})
export class PatientsListComponent {
  protected readonly pageSize = PATIENTS_LIST_PAGE_SIZE;
  protected readonly filterCompanies = PATIENT_FILTER_COMPANIES;

  protected readonly searchQuery = signal('');
  protected readonly statusFilter = signal<PatientStatusFilter>('all');
  protected readonly companyFilter = signal('');
  protected readonly dateFrom = signal('');
  protected readonly dateTo = signal('');
  protected readonly filtersOpen = signal(false);
  protected readonly currentPage = signal(1);

  protected readonly filteredPatients = computed<PatientListItem[]>(() => {
    const query = this.searchQuery().trim();
    const status = this.statusFilter();
    const company = this.companyFilter();
    const from = this.dateFrom();
    const to = this.dateTo();

    const results: PatientListItem[] = [];

    for (let index = 0; index < PATIENTS_LIST_TOTAL; index += 1) {
      const patient = buildPatientListItem(index);

      if (status !== 'all' && patient.status !== status) {
        continue;
      }

      if (company && patient.company !== company) {
        continue;
      }

      if (!matchesPatientDateRange(patient, from, to)) {
        continue;
      }

      if (!matchesPatientSearch(patient, query)) {
        continue;
      }

      results.push(patient);
    }

    return results;
  });

  protected readonly totalPatients = computed(() => this.filteredPatients().length);

  protected readonly totalPages = computed(() =>
    Math.max(1, Math.ceil(this.totalPatients() / this.pageSize)),
  );

  protected readonly visiblePatients = computed<PatientListItem[]>(() => {
    const startIndex = (this.currentPage() - 1) * this.pageSize;
    return this.filteredPatients().slice(startIndex, startIndex + this.pageSize);
  });

  protected readonly rangeStart = computed(() => {
    if (this.totalPatients() === 0) {
      return 0;
    }

    return (this.currentPage() - 1) * this.pageSize + 1;
  });

  protected readonly rangeEnd = computed(() =>
    Math.min(this.currentPage() * this.pageSize, this.totalPatients()),
  );

  protected readonly visiblePageNumbers = computed(() => {
    const total = this.totalPages();
    const current = this.currentPage();

    if (total <= 3) {
      return Array.from({ length: total }, (_, index) => index + 1);
    }

    if (current <= 2) {
      return [1, 2, 3];
    }

    if (current >= total - 1) {
      return [total - 2, total - 1, total];
    }

    return [current - 1, current, current + 1];
  });

  protected readonly canGoPrevious = computed(() => this.currentPage() > 1);
  protected readonly canGoNext = computed(() => this.currentPage() < this.totalPages());
  protected readonly hasActiveFilters = computed(
    () => Boolean(this.companyFilter() || this.dateFrom() || this.dateTo()),
  );

  @HostListener('document:click')
  protected closeFiltersOnOutsideClick(): void {
    this.filtersOpen.set(false);
  }

  protected statusLabel(status: PatientListItem['status']): string {
    return status === 'active' ? 'ACTIVO' : 'INACTIVO';
  }

  protected onSearchInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.searchQuery.set(value);
    this.currentPage.set(1);
  }

  protected setStatusFilter(status: PatientStatusFilter): void {
    this.statusFilter.set(status);
    this.currentPage.set(1);
  }

  protected isStatusFilterActive(status: PatientStatusFilter): boolean {
    return this.statusFilter() === status;
  }

  protected toggleFilters(event: Event): void {
    event.stopPropagation();
    this.filtersOpen.update((open) => !open);
  }

  protected onFiltersPanelClick(event: Event): void {
    event.stopPropagation();
  }

  protected onCompanyFilterChange(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    this.companyFilter.set(value);
    this.currentPage.set(1);
  }

  protected onDateFromChange(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.dateFrom.set(value);
    this.currentPage.set(1);
  }

  protected onDateToChange(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.dateTo.set(value);
    this.currentPage.set(1);
  }

  protected clearFilters(): void {
    this.companyFilter.set('');
    this.dateFrom.set('');
    this.dateTo.set('');
    this.currentPage.set(1);
  }

  protected goToPage(page: number): void {
    const nextPage = Math.min(Math.max(page, 1), this.totalPages());
    this.currentPage.set(nextPage);
  }

  protected goToPreviousPage(): void {
    this.goToPage(this.currentPage() - 1);
  }

  protected goToNextPage(): void {
    this.goToPage(this.currentPage() + 1);
  }

  protected actionsPlacement(offset: number): 'bottom' | 'top' {
    return offset >= this.pageSize - 2 ? 'top' : 'bottom';
  }
}
