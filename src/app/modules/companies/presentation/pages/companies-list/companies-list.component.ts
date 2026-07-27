import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CompanyActionsMenuComponent } from '../../components/company-actions-menu/company-actions-menu.component';

export type CompaniesViewMode = 'cards' | 'list';

@Component({
  selector: 'uh-companies-list',
  standalone: true,
  imports: [CompanyActionsMenuComponent, RouterLink],
  templateUrl: './companies-list.component.html',
  styleUrl: './companies-list.component.scss',
})
export class CompaniesListComponent {
  protected readonly viewMode = signal<CompaniesViewMode>('cards');

  protected setViewMode(mode: CompaniesViewMode): void {
    this.viewMode.set(mode);
  }
}
