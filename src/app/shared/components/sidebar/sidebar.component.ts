import { Component, OnInit, HostListener, ElementRef } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

import { MenuItemComponent, MenuItem } from './menu-item/menu-item.component';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  standalone: true,
  imports: [
    MatIconModule,
    MenuItemComponent
]
})
export class SidebarComponent implements OnInit {
  private readonly STORAGE_KEY = 'angularDashboardTemplate.currentNavWidth';
  private readonly MIN_WIDTH = 150;
  private readonly MAX_WIDTH = 500;
  private readonly DEFAULT_WIDTH = 250;

  sidebarWidth: number = this.DEFAULT_WIDTH;
  isResizing: boolean = false;
  private startX: number = 0;
  private startWidth: number = 0;

  menuItems: MenuItem[] = [
    {
      icon: 'home', label: 'Dashboard', route: '/',
      children: []
    },
    {
      icon: 'event', label: 'Events', route: '',
      children: [
        { icon: 'person', label: 'EventsSubMenu1', route: '/events/submenu1' },
        { icon: 'person', label: 'EventsSubMenu2', route: '/events/submenu2' },
        { icon: 'person', label: 'EventsSubMenu3', route: '/events/submenu3' },
      ]
    },
    {
      icon: 'build', label: 'Admin', route: '',
      children: [
        { icon: 'person', label: 'Settings', route: '/admin/settings' },
        { icon: 'person', label: 'Roles', route: '/admin/roles' },
        { icon: 'person', label: 'Permissions', route: '/admin/permissions' },
        { icon: 'person', label: 'Users', route: '/admin/users' },
      ]
    },
    {
      icon: 'info', label: 'About', route: '',
      children: [
        { icon: 'person', label: 'Contact', route: '/about/contact' },
        { icon: 'person', label: 'Software', route: '/about/software' },
      ]
    },
  ];

  constructor(private elementRef: ElementRef) { }

  ngOnInit(): void {
    // Load saved width from localStorage
    const savedWidth = localStorage.getItem(this.STORAGE_KEY);
    if (savedWidth) {
      const width = parseInt(savedWidth, 10);
      if (width >= this.MIN_WIDTH && width <= this.MAX_WIDTH) {
        this.sidebarWidth = width;
      }
    }
    this.updateSidebarWidth();
  }

  onResizeHandleMouseDown(event: MouseEvent): void {
    event.preventDefault();
    this.isResizing = true;
    this.startX = event.clientX;
    this.startWidth = this.sidebarWidth;
    document.body.classList.add('resizing');
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    if (!this.isResizing) return;

    const delta = event.clientX - this.startX;
    const newWidth = this.startWidth + delta;

    if (newWidth >= this.MIN_WIDTH && newWidth <= this.MAX_WIDTH) {
      this.sidebarWidth = newWidth;
      this.updateSidebarWidth();
    }
  }

  @HostListener('document:mouseup')
  onMouseUp(): void {
    if (this.isResizing) {
      this.isResizing = false;
      document.body.classList.remove('resizing');
      // Save to localStorage
      localStorage.setItem(this.STORAGE_KEY, this.sidebarWidth.toString());
    }
  }

  private updateSidebarWidth(): void {
    const sidebarElement = this.elementRef.nativeElement.querySelector('.mac-sidebar');
    if (sidebarElement) {
      sidebarElement.style.width = `${this.sidebarWidth}px`;
    }

    // Update the mat-drawer width as well
    const drawer = this.elementRef.nativeElement.closest('mat-drawer');
    if (drawer) {
      drawer.style.width = `${this.sidebarWidth}px`;
      drawer.style.minWidth = `${this.sidebarWidth}px`;
      drawer.style.maxWidth = `${this.sidebarWidth}px`;
    }

    // Trigger a window resize event to make mat-drawer-container recalculate layout
    window.dispatchEvent(new Event('resize'));
  }

}
