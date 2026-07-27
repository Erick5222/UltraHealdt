import { Injectable, signal } from '@angular/core';
import {
  buildRipsSummaryStats,
  INITIAL_RIPS_PROCESSES,
  INITIAL_RIPS_VALIDATION_ISSUES,
  RipsProcessRecord,
  RipsSummaryStats,
  RipsValidationIssue,
} from '../pages/rips/rips.config';

@Injectable({ providedIn: 'root' })
export class RipsStateService {
  private readonly processes = signal<RipsProcessRecord[]>(
    INITIAL_RIPS_PROCESSES.map((process) => ({ ...process })),
  );
  private readonly issues = signal<RipsValidationIssue[]>(
    INITIAL_RIPS_VALIDATION_ISSUES.map((issue) => ({ ...issue })),
  );
  private readonly showAllProcesses = signal(false);

  readonly processList = this.processes.asReadonly();
  readonly validationIssues = this.issues.asReadonly();
  readonly showAll = this.showAllProcesses.asReadonly();

  visibleProcesses(): RipsProcessRecord[] {
    return this.showAllProcesses()
      ? this.processes()
      : this.processes().filter((process) => process.isRecent);
  }

  summaryStats(): RipsSummaryStats {
    return buildRipsSummaryStats(this.processes(), this.issues());
  }

  criticalIssuesCount(): number {
    return this.issues().filter((issue) => !issue.resolved).length;
  }

  toggleShowAllProcesses(): void {
    this.showAllProcesses.update((value) => !value);
  }

  generateProcess(): RipsProcessRecord {
    const created: RipsProcessRecord = {
      id: `proc-${Date.now()}`,
      dateLabel: new Date().toLocaleDateString('es-CO', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      }),
      periodLabel: 'Periodo actual',
      company: 'Nuevo lote RIPS',
      records: 0,
      status: 'validating',
      statusLabel: 'Validando',
      actionType: 'status',
      isRecent: true,
    };

    this.processes.update((list) => [created, ...list]);
    return created;
  }

  resolveIssue(issueId: string): void {
    this.issues.update((list) =>
      list.map((issue) => (issue.id === issueId ? { ...issue, resolved: true } : issue)),
    );
  }

  revalidateAll(): void {
    this.issues.update((list) => list.map((issue) => ({ ...issue, resolved: true })));
    this.processes.update((list) =>
      list.map((process) =>
        process.status === 'validating'
          ? {
              ...process,
              status: 'validated',
              statusLabel: 'Validado',
              actionType: 'download',
            }
          : process.status === 'errors'
            ? process
            : process,
      ),
    );
  }

  runValidationEngine(): number {
    let updatedCount = 0;

    this.processes.update((list) =>
      list.map((process) => {
        if (process.status !== 'validating') {
          return process;
        }

        updatedCount += 1;
        const hasErrors = this.issues().some((issue) => !issue.resolved);
        return {
          ...process,
          status: hasErrors ? 'errors' : 'validated',
          statusLabel: hasErrors ? 'Con errores' : 'Validado',
          actionType: hasErrors ? 'errors' : 'download',
        } as RipsProcessRecord;
      }),
    );

    return updatedCount;
  }

  refreshProcessStatus(processId: string): RipsProcessRecord | null {
    let updated: RipsProcessRecord | null = null;

    this.processes.update((list) =>
      list.map((process) => {
        if (process.id !== processId) {
          return process;
        }

        const hasErrors = this.issues().some((issue) => !issue.resolved);
        updated = {
          ...process,
          status: hasErrors ? 'errors' : 'validated',
          statusLabel: hasErrors ? 'Con errores' : 'Validado',
          actionType: hasErrors ? 'errors' : 'download',
        };
        return updated;
      }),
    );

    return updated;
  }

  getProcess(processId: string): RipsProcessRecord | undefined {
    return this.processes().find((process) => process.id === processId);
  }
}
