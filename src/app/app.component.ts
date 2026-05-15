import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [RouterOutlet]
})
export class AppComponent implements OnInit {
  title = 'Astrolight';

  ngOnInit(): void {
    // Initialize theme on app launch/reload
    const savedTheme = localStorage.getItem('astrolight.selectedTheme');
    const themeToApply = savedTheme || 'dracula';
    this.applyTheme(themeToApply);
  }

  private applyTheme(themeId: string): void {
    // Remove all theme classes
    document.body.classList.remove('theme-light', 'theme-dark', 'theme-dracula');
    // Add selected theme class
    document.body.classList.add(`theme-${themeId}`);
  }
}
