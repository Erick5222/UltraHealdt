import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'uh-billing-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './billing-header.component.html',
  styleUrl: './billing-header.component.scss',
})
export class BillingHeaderComponent {}
