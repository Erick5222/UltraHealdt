import { Component, output } from '@angular/core';

@Component({
  selector: 'uh-rips-header',
  standalone: true,
  templateUrl: './rips-header.component.html',
  styleUrl: './rips-header.component.scss',
})
export class RipsHeaderComponent {
  consultHistory = output<void>();
  generateRips = output<void>();
}
