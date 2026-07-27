import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'uh-company-form',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './company-form.component.html',
  styleUrl: './company-form.component.scss',
})
export class CompanyFormComponent {}
