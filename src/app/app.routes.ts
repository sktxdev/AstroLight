import { Routes } from '@angular/router';
import { DefaultComponent } from './layouts/default/default.component';
import { DashboardComponent } from './features/MyImages/dashboard.component';
import { AboutComponent } from './features/about/about.component';
import { SettingsComponent } from './features/settings/settings.component';
import { ThemeComponent } from './features/settings/theme/theme.component';
import { ContactComponent } from './features/about/contact/contact.component';
import { SoftwareComponent } from './features/about/software/software.component';

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
        path: 'settings',
        component: SettingsComponent
      },
      {
        path: 'settings/theme',
        component: ThemeComponent
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
