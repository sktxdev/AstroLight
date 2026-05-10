import { Component, Input } from '@angular/core';

import { MatIconModule } from '@angular/material/icon';
import { RouterLink, RouterLinkActive } from '@angular/router';

export interface MenuItem {
  icon: string;
  label: string;
  route: string;
  children?: MenuItem[];
}

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.scss'],
  standalone: true,
  imports: [
    MatIconModule,
    RouterLink,
    RouterLinkActive
]
})
export class MenuItemComponent {
  @Input() item!: MenuItem;
  @Input() level: number = 0;
  @Input() path: string = '';

  expanded: { [key: string]: boolean } = {};

  toggleMenu(key: string): void {
    this.expanded[key] = !this.expanded[key];
  }

  isExpanded(key: string): boolean {
    return this.expanded[key] || false;
  }

  getMenuKey(label: string): string {
    return this.path ? `${this.path}-${label}` : label;
  }

  hasChildren(item: MenuItem): boolean {
    return !!(item.children && item.children.length > 0);
  }

  getPaddingLeft(): string {
    return `${20 + (this.level * 20)}px`;
  }

  getFontSize(): string {
    const sizes = ['14px', '13px', '12px', '11px', '10px'];
    return sizes[Math.min(this.level, sizes.length - 1)];
  }

  getIconSize(): string {
    const sizes = ['20px', '18px', '16px', '14px', '12px'];
    return sizes[Math.min(this.level, sizes.length - 1)];
  }
}
