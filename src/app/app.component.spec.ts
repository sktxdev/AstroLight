/// <reference types="jasmine" />
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  const storageKey = 'angularDashboardTemplate.selectedTheme';

  beforeEach(async () => {
    // Clear localStorage before each test
    localStorage.clear();

    await TestBed.configureTestingModule({
      imports: [
        AppComponent,
        RouterTestingModule
      ]
    }).compileComponents();
  });

  afterEach(() => {
    // Clean up localStorage after each test
    localStorage.clear();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'Dashboard Demo'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('Dashboard Demo');
  });

  it('should apply dracula theme by default when no saved theme exists', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();

    expect(document.body.classList.contains('theme-dracula')).toBeTruthy();
  });

  it('should apply saved theme from localStorage on init', () => {
    localStorage.setItem(storageKey, 'light');
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();

    expect(document.body.classList.contains('theme-light')).toBeTruthy();
    expect(document.body.classList.contains('theme-dracula')).toBeFalsy();
  });

  it('should remove previous theme class when applying new theme', () => {
    localStorage.setItem(storageKey, 'dark');
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();

    expect(document.body.classList.contains('theme-dark')).toBeTruthy();
    expect(document.body.classList.contains('theme-dracula')).toBeFalsy();
    expect(document.body.classList.contains('theme-light')).toBeFalsy();
  });

  // it('should render title', () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.nativeElement as HTMLElement;
  //   console.log(compiled);
  //   expect(compiled.querySelector('.content span')?.textContent).toContain('router-outlet');
  // });
});
