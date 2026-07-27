import { Component, output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import {
  NavigationIcon,
  NavigationItem,
  PRIMARY_NAVIGATION,
  SECONDARY_NAVIGATION,
} from './navigation.config';

@Component({
  selector: 'uh-navigation',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss',
})
export class NavigationComponent {
  readonly navigate = output<void>();

  protected readonly primaryItems: NavigationItem[] = PRIMARY_NAVIGATION;
  protected readonly secondaryItems: NavigationItem[] = SECONDARY_NAVIGATION;

  onNavigate(): void {
    this.navigate.emit();
  }

  protected trackByRoute(_index: number, item: NavigationItem): string {
    return item.route;
  }

  protected iconPath(icon: NavigationIcon): string {
    return `/images/icons/Navigation/${icon}.svg`;
  }
}
