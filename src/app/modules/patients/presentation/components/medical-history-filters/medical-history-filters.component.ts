import { Component, computed, HostListener, input, output, signal } from '@angular/core';
import {
  DEFAULT_MEDICAL_HISTORY_FILTERS,
  hasActiveMedicalHistoryFilters,
  MEDICAL_HISTORY_DOCTORS,
  MEDICAL_HISTORY_EXAM_TYPES,
  MedicalHistoryFilters,
} from '../../pages/medical-history/medical-history.config';

type FilterPanel = 'date' | 'exam' | 'doctor' | 'advanced' | null;

@Component({
  selector: 'uh-medical-history-filters',
  standalone: true,
  templateUrl: './medical-history-filters.component.html',
  styleUrl: './medical-history-filters.component.scss',
})
export class MedicalHistoryFiltersComponent {
  filters = input<MedicalHistoryFilters>(DEFAULT_MEDICAL_HISTORY_FILTERS);
  filtersChange = output<MedicalHistoryFilters>();

  protected readonly examTypes = MEDICAL_HISTORY_EXAM_TYPES;
  protected readonly doctors = MEDICAL_HISTORY_DOCTORS;
  protected readonly openPanel = signal<FilterPanel>(null);

  protected readonly hasActiveFilters = computed(() => hasActiveMedicalHistoryFilters(this.filters()));

  protected readonly isDateActive = computed(() => Boolean(this.filters().dateFrom || this.filters().dateTo));
  protected readonly isExamActive = computed(() => Boolean(this.filters().examType));
  protected readonly isDoctorActive = computed(() => Boolean(this.filters().doctor));

  @HostListener('document:click')
  protected closePanelsOnOutsideClick(): void {
    this.openPanel.set(null);
  }

  protected togglePanel(panel: Exclude<FilterPanel, null>, event: Event): void {
    event.stopPropagation();
    this.openPanel.update((current) => (current === panel ? null : panel));
  }

  protected onPanelClick(event: Event): void {
    event.stopPropagation();
  }

  protected updateFilters(partial: Partial<MedicalHistoryFilters>): void {
    this.filtersChange.emit({ ...this.filters(), ...partial });
  }

  protected onDateFromChange(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.updateFilters({ dateFrom: value });
  }

  protected onDateToChange(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.updateFilters({ dateTo: value });
  }

  protected onExamTypeChange(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    this.updateFilters({ examType: value });
  }

  protected onDoctorChange(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    this.updateFilters({ doctor: value });
  }

  protected onStatusChange(event: Event): void {
    const value = (event.target as HTMLSelectElement).value as MedicalHistoryFilters['status'];
    this.updateFilters({ status: value });
  }

  protected onAptitudeChange(event: Event): void {
    const value = (event.target as HTMLSelectElement).value as MedicalHistoryFilters['aptitude'];
    this.updateFilters({ aptitude: value });
  }

  protected clearFilters(): void {
    this.filtersChange.emit({ ...DEFAULT_MEDICAL_HISTORY_FILTERS });
    this.openPanel.set(null);
  }
}
