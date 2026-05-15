import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemeComponent } from './theme.component';

describe('ThemeComponent', () => {
  let component: ThemeComponent;
  let fixture: ComponentFixture<ThemeComponent>;
  const storageKey = 'astrolight.selectedTheme';

  beforeEach(async () => {
    // Clear localStorage before each test
    localStorage.clear();

    await TestBed.configureTestingModule({
      imports: [ThemeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThemeComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    // Clean up localStorage after each test
    localStorage.clear();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with dracula theme by default', () => {
    fixture.detectChanges();
    expect(component.selectedTheme).toBe('dracula');
  });

  it('should load saved theme from localStorage on init', () => {
    localStorage.setItem(storageKey, 'dark');
    fixture.detectChanges();

    expect(component.selectedTheme).toBe('dark');
  });

  it('should apply dracula theme when no theme is saved', () => {
    fixture.detectChanges();

    expect(component.selectedTheme).toBe('dracula');
  });

  it('should save theme to localStorage when selectTheme is called', () => {
    fixture.detectChanges();

    component.selectTheme('dracula');

    expect(localStorage.getItem(storageKey)).toBe('dracula');
    expect(component.selectedTheme).toBe('dracula');
  });

  it('should apply theme class to body when selectTheme is called', () => {
    fixture.detectChanges();

    component.selectTheme('dark');

    expect(document.body.classList.contains('theme-dark')).toBeTruthy();
    expect(document.body.classList.contains('theme-light')).toBeFalsy();
  });

  it('should remove previous theme class when applying new theme', () => {
    fixture.detectChanges();

    component.selectTheme('light');
    expect(document.body.classList.contains('theme-light')).toBeTruthy();

    component.selectTheme('dark');
    expect(document.body.classList.contains('theme-light')).toBeFalsy();
    expect(document.body.classList.contains('theme-dark')).toBeTruthy();
  });

  it('should handle onThemeChange event', () => {
    fixture.detectChanges();

    const mockEvent = {
      target: { value: 'dracula' }
    } as any;

    component.onThemeChange(mockEvent);

    expect(component.selectedTheme).toBe('dracula');
    expect(localStorage.getItem(storageKey)).toBe('dracula');
  });

  it('should have correct theme definitions', () => {
    expect(component.themes).toEqual([
      { id: 'light', name: 'Light', description: 'Clean and bright interface' },
      { id: 'dark', name: 'Dark', description: 'Easy on the eyes' },
      { id: 'dracula', name: 'Dracula', description: 'VSCode Dracula theme inspired' }
    ]);
  });
});
