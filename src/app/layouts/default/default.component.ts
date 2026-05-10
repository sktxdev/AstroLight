import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { SidebarComponent } from '../../shared/components/sidebar/sidebar.component';
import { MatSidenavModule } from '@angular/material/sidenav';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss'],
  standalone: true,
  imports: [
    RouterOutlet,
    // HeaderComponent,
    FooterComponent,
    SidebarComponent,
    MatSidenavModule
  ]
})
export class DefaultComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
