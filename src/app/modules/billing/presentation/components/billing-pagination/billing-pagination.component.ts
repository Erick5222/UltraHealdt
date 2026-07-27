import { Component, input, output } from '@angular/core';

@Component({
  selector: 'uh-billing-pagination',
  standalone: true,
  templateUrl: './billing-pagination.component.html',
  styleUrl: './billing-pagination.component.scss',
})
export class BillingPaginationComponent {
  currentPage = input(1);
  totalPages = input(1);
  pageNumbers = input<number[]>([1]);
  label = input('Mostrando 0 de 0 facturas');

  pageChange = output<number>();
  previous = output<void>();
  next = output<void>();

  protected isActive(page: number): boolean {
    return this.currentPage() === page;
  }
}
