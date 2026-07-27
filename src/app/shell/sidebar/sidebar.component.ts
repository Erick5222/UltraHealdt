import { Component, inject } from '@angular/core';
import { NavigationComponent } from '../navigation/navigation.component';
import { ShellLayoutService } from '../services/shell-layout.service';

@Component({
  selector: 'uh-sidebar',
  standalone: true,
  imports: [NavigationComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  protected readonly shellLayout = inject(ShellLayoutService);

  closeSidebar(): void {
    this.shellLayout.closeSidebar();
  }
}
