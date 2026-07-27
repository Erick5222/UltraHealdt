import { Component, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

export type CompanyActionsStatus = 'active' | 'suspended';
export type CompanyActionsPlacement = 'bottom' | 'top';

@Component({
  selector: 'uh-company-actions-menu',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './company-actions-menu.component.html',
  styleUrl: './company-actions-menu.component.scss',
  host: {
    class: 'company-actions-menu-host',
    '(document:click)': 'close()',
  },
})
export class CompanyActionsMenuComponent {
  companyId = input.required<string>();
  status = input.required<CompanyActionsStatus>();
  placement = input<CompanyActionsPlacement>('bottom');

  protected readonly isOpen = signal(false);

  protected toggle(event: Event): void {
    event.stopPropagation();
    this.isOpen.update((open) => !open);
  }

  protected close(): void {
    this.isOpen.set(false);
  }

  protected onMenuClick(event: Event): void {
    event.stopPropagation();
    this.close();
  }

  protected editRoute(): string[] {
    return ['/companies', this.companyId(), 'edit'];
  }

  protected statusActionLabel(): string {
    return this.status() === 'active' ? 'Suspender empresa' : 'Reactivar empresa';
  }
}
