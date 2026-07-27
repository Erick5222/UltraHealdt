import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'uh-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private readonly router = inject(Router);

  goToDashboard(): void {
    void this.router.navigate(['/dashboard']);
  }
}
