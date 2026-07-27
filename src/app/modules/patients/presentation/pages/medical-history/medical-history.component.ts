import { Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { MedicalHistoryFiltersComponent } from '../../components/medical-history-filters/medical-history-filters.component';
import { MedicalHistoryHeaderComponent } from '../../components/medical-history-header/medical-history-header.component';
import {
  DEFAULT_MEDICAL_HISTORY_FILTERS,
  filterMedicalHistoryRecords,
  MEDICAL_HISTORY_INITIAL_VISIBLE,
  MEDICAL_HISTORY_RECORDS,
  MedicalHistoryFilters,
  MedicalHistoryRecord,
} from './medical-history.config';

@Component({
  selector: 'uh-medical-history',
  standalone: true,
  imports: [MedicalHistoryHeaderComponent, MedicalHistoryFiltersComponent],
  templateUrl: './medical-history.component.html',
  styleUrl: './medical-history.component.scss',
})
export class MedicalHistoryComponent {
  private readonly route = inject(ActivatedRoute);

  protected readonly patientId = toSignal(
    this.route.parent!.paramMap.pipe(map((params) => params.get('id') ?? '')),
    { initialValue: '' },
  );

  protected readonly filters = signal<MedicalHistoryFilters>({ ...DEFAULT_MEDICAL_HISTORY_FILTERS });
  protected readonly visibleLimit = signal(MEDICAL_HISTORY_INITIAL_VISIBLE);
  protected readonly actionMessage = signal<string | null>(null);

  protected readonly filteredRecords = computed(() =>
    filterMedicalHistoryRecords(MEDICAL_HISTORY_RECORDS, this.filters()),
  );

  protected readonly visibleRecords = computed(() =>
    this.filteredRecords().slice(0, this.visibleLimit()),
  );

  protected readonly hasMoreRecords = computed(
    () => this.visibleLimit() < this.filteredRecords().length,
  );

  protected readonly hasFilteredResults = computed(() => this.filteredRecords().length > 0);

  protected onFiltersChange(filters: MedicalHistoryFilters): void {
    this.filters.set(filters);
    this.visibleLimit.set(MEDICAL_HISTORY_INITIAL_VISIBLE);
  }

  protected loadMoreRecords(): void {
    this.visibleLimit.update((limit) => limit + MEDICAL_HISTORY_INITIAL_VISIBLE);
  }

  protected statusClass(status: MedicalHistoryRecord['status']): string {
    return status === 'validated'
      ? 'medical-history__status--validated'
      : 'medical-history__status--archived';
  }

  protected statusLabel(status: MedicalHistoryRecord['status']): string {
    return status === 'validated' ? 'VALIDADO' : 'ARCHIVADO';
  }

  protected aptitudeClass(aptitude: MedicalHistoryRecord['aptitude']): string {
    return aptitude === 'restricted'
      ? 'medical-history__aptitude--restricted'
      : 'medical-history__aptitude--fit';
  }

  protected viewDetail(record: MedicalHistoryRecord): void {
    this.showActionMessage(`Abriendo detalle del registro ${record.registryId}`);
  }

  protected viewResults(record: MedicalHistoryRecord): void {
    this.showActionMessage(`Consultando resultados de ${record.title}`);
  }

  protected downloadPdf(record: MedicalHistoryRecord): void {
    this.showActionMessage(`Descargando PDF del registro ${record.registryId}`);
  }

  private showActionMessage(message: string): void {
    this.actionMessage.set(message);
    window.setTimeout(() => this.actionMessage.set(null), 3200);
  }
}
