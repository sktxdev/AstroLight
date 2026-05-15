import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-theme',
  templateUrl: './theme.component.html',
  styleUrls: ['./theme.component.scss'],
  standalone: true,
  imports: [FormsModule]
})
export class ThemeComponent implements OnInit {
  themes = [
    { id: 'light', name: 'Light', description: 'Clean and bright interface' },
    { id: 'dark', name: 'Dark', description: 'Easy on the eyes' },
    { id: 'dracula', name: 'Dracula', description: 'VSCode Dracula theme inspired' }
  ];

  selectedTheme: string = 'dracula';

  constructor() { }

  ngOnInit(): void {
    // Load saved theme from localStorage
    const savedTheme = localStorage.getItem('astrolight.selectedTheme');
    if (savedTheme) {
      this.selectedTheme = savedTheme;
    }
    // Theme is already applied by AppComponent on launch
  }

  selectTheme(themeId: string): void {
    this.selectedTheme = themeId;
    this.applyTheme(themeId);
    localStorage.setItem('astrolight.selectedTheme', themeId);
  }

  onThemeChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.selectTheme(selectElement.value);
  }

  private applyTheme(themeId: string): void {
    // Remove all theme classes
    document.body.classList.remove('theme-light', 'theme-dark', 'theme-dracula');
    // Add selected theme class
    document.body.classList.add(`theme-${themeId}`);
  }
}
