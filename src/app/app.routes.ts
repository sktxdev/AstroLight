import { Routes } from '@angular/router';
import { DefaultComponent } from './layouts/default/default.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { UsersComponent } from './features/users/users.component';
import { EventsComponent } from './features/events/events.component';
import { AboutComponent } from './features/about/about.component';
import { AdminComponent } from './features/admin/admin.component';
import { SettingsComponent } from './features/settings/settings.component';
import { RolesComponent } from './features/admin/roles/roles.component';
import { PermissionsComponent } from './features/admin/permissions/permissions.component';
import { ContactComponent } from './features/about/contact/contact.component';
import { SoftwareComponent } from './features/about/software/software.component';
import { EventsSubmenu2Component } from './features/events/events-submenu-2/events-submenu-2.component';
import { EventsSubmenu1Component } from './features/events/events-submenu-1/events-submenu-1.component';
import { EventsSubmenu3Component } from './features/events/events-submenu-3/events-submenu-3.component';

export const routes: Routes = [
  {
    path: '',
    component: DefaultComponent,
    children: [
      {
        path: '',
        component: DashboardComponent
      },
      {
        path: 'events',
        component: EventsComponent
      },
      {
        path: 'events/submenu1',
        component: EventsSubmenu1Component
      },
      {
        path: 'events/submenu2',
        component: EventsSubmenu2Component
      },
      {
        path: 'events/submenu3',
        component: EventsSubmenu3Component
      },
      {
        path: 'users',
        component: UsersComponent
      },
      {
        path: 'admin',
        component: AdminComponent
      },
      {
        path: 'admin/settings',
        component: SettingsComponent
      },
      {
        path: 'admin/roles',
        component: RolesComponent
      },
      {
        path: 'admin/permissions',
        component: PermissionsComponent
      },
      {
        path: 'admin/users',
        component: UsersComponent
      },
      {
        path: 'about',
        component: AboutComponent
      },
      {
        path: 'about/contact',
        component: ContactComponent
      },
      {
        path: 'about/software',
        component: SoftwareComponent
      }
    ]
  }
];
