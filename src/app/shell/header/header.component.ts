import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ShellLayoutService } from '../services/shell-layout.service';

@Component({
  selector: 'uh-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  protected readonly shellLayout = inject(ShellLayoutService);
}
