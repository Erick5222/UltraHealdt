import { Component, computed, ElementRef, inject, signal, viewChild } from '@angular/core';
import { RipsHeaderComponent } from '../../components/rips-header/rips-header.component';
import { RipsProcessesTableComponent } from '../../components/rips-processes-table/rips-processes-table.component';
import { RipsSummaryComponent } from '../../components/rips-summary/rips-summary.component';
import { RipsValidationPanelComponent } from '../../components/rips-validation-panel/rips-validation-panel.component';
import { RipsStateService } from '../../services/rips-state.service';
import {
  exportRipsHistoryReport,
  exportRipsProcessesFile,
} from './rips.config';

@Component({
  selector: 'uh-rips',
  standalone: true,
  imports: [
    RipsHeaderComponent,
    RipsSummaryComponent,
    RipsProcessesTableComponent,
    RipsValidationPanelComponent,
  ],
  templateUrl: './rips.component.html',
  styleUrl: './rips.component.scss',
})
export class RipsComponent {
  private readonly ripsState = inject(RipsStateService);
  private readonly validationPanel = viewChild<ElementRef<HTMLElement>>('validationPanel');

  protected readonly actionMessage = signal<string | null>(null);
  protected readonly highlightValidation = signal(false);

  protected readonly visibleProcesses = computed(() => this.ripsState.visibleProcesses());
  protected readonly showAllProcesses = computed(() => this.ripsState.showAll());
  protected readonly validationIssues = computed(() => this.ripsState.validationIssues());
  protected readonly summaryStats = computed(() => this.ripsState.summaryStats());
  protected readonly criticalCount = computed(() => this.ripsState.criticalIssuesCount());

  protected onConsultHistory(): void {
    const processes = this.ripsState.processList();
    const exported = exportRipsHistoryReport(processes);
    this.setActionMessage(
      exported
        ? `Historial RIPS generado (${processes.length} procesos). Revise la ventana de impresión.`
        : 'No se pudo abrir el historial. Verifique el bloqueo de ventanas emergentes.',
    );
  }

  protected onGenerateRips(): void {
    const created = this.ripsState.generateProcess();
    this.setActionMessage(
      `Proceso RIPS iniciado para ${created.company} (${created.dateLabel}). Estado: validando.`,
    );
  }

  protected onAttendNow(): void {
    this.focusValidationPanel('Revise las inconsistencias críticas en el Centro de Validación.');
  }

  protected onValidateInfo(): void {
    const updatedCount = this.ripsState.runValidationEngine();
    this.setActionMessage(
      updatedCount > 0
        ? `Motor de reglas ejecutado sobre ${updatedCount} proceso(s) en validación.`
        : 'No hay procesos en validación pendientes de revisar.',
    );
  }

  protected onExportFile(): void {
    const validated = this.ripsState
      .processList()
      .filter((process) => process.status === 'validated');

    if (!validated.length) {
      this.setActionMessage('No hay procesos validados disponibles para exportar.');
      return;
    }

    const txtExported = exportRipsProcessesFile(validated, 'txt');
    const jsonExported = exportRipsProcessesFile(validated, 'json');

    this.setActionMessage(
      txtExported && jsonExported
        ? `Exportación completada: ${validated.length} proceso(s) en .txt y .json.`
        : 'No se pudo completar la exportación de archivos RIPS.',
    );
  }

  protected onToggleViewAll(): void {
    this.ripsState.toggleShowAllProcesses();
    this.setActionMessage(
      this.ripsState.showAll()
        ? 'Mostrando historial completo de procesos RIPS.'
        : 'Mostrando solo los procesos recientes.',
    );
  }

  protected onProcessAction(processId: string): void {
    const process = this.ripsState.getProcess(processId);
    if (!process) {
      return;
    }

    if (process.actionType === 'download') {
      const exported = exportRipsProcessesFile([process], 'txt');
      this.setActionMessage(
        exported
          ? `Descarga iniciada: ${process.company} (${process.periodLabel}).`
          : `No se pudo descargar el archivo de ${process.company}.`,
      );
      return;
    }

    if (process.actionType === 'errors') {
      this.focusValidationPanel(
        `Errores detectados en ${process.company}. Revise el Centro de Validación.`,
      );
      return;
    }

    const updated = this.ripsState.refreshProcessStatus(processId);
    if (!updated) {
      return;
    }

    this.setActionMessage(
      `Estado actualizado: ${updated.company} ahora está ${updated.statusLabel.toLowerCase()}.`,
    );
  }

  protected onCorrectIssue(issueId: string): void {
    const issue = this.ripsState.validationIssues().find((item) => item.id === issueId);
    if (!issue || issue.resolved) {
      return;
    }

    this.ripsState.resolveIssue(issueId);
    this.setActionMessage(`Inconsistencia ${issue.code} marcada como corregida.`);
  }

  protected onRevalidateAll(): void {
    this.ripsState.revalidateAll();
    this.setActionMessage('Re-validación completada. Todas las inconsistencias fueron resueltas.');
  }

  private focusValidationPanel(message: string): void {
    this.highlightValidation.set(true);
    this.setActionMessage(message);

    const panel = this.validationPanel()?.nativeElement;
    panel?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

    window.setTimeout(() => this.highlightValidation.set(false), 1800);
  }

  private setActionMessage(message: string): void {
    this.actionMessage.set(message);
    window.setTimeout(() => this.actionMessage.set(null), 4500);
  }
}
