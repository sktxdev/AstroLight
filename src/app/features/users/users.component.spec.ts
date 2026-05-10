import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { UsersComponent } from './users.component';

describe('UsersComponent', () => {
  let component: UsersComponent ;
  let fixture: ComponentFixture<UsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ UsersComponent ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            url: of([])
          }
        }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default title as "Users"', () => {
    expect(component.title).toBe('Users');
  });

  it('should update title based on last route segment with kebab-case', () => {
    const mockRoute = {
      url: of([
        { path: 'users', parameters: {} },
        { path: 'team-members', parameters: {} }
      ])
    };

    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      imports: [ UsersComponent ],
      providers: [
        { provide: ActivatedRoute, useValue: mockRoute }
      ]
    });

    const newFixture = TestBed.createComponent(UsersComponent);
    const newComponent = newFixture.componentInstance;
    newFixture.detectChanges();

    expect(newComponent.title).toBe('Team Members');
  });

  it('should update title based on last route segment with snake_case', () => {
    const mockRoute = {
      url: of([
        { path: 'users', parameters: {} },
        { path: 'active_users', parameters: {} }
      ])
    };

    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      imports: [ UsersComponent ],
      providers: [
        { provide: ActivatedRoute, useValue: mockRoute }
      ]
    });

    const newFixture = TestBed.createComponent(UsersComponent);
    const newComponent = newFixture.componentInstance;
    newFixture.detectChanges();

    expect(newComponent.title).toBe('Active Users');
  });

  it('should update title for single word route segment', () => {
    const mockRoute = {
      url: of([
        { path: 'users', parameters: {} },
        { path: 'administrators', parameters: {} }
      ])
    };

    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      imports: [ UsersComponent ],
      providers: [
        { provide: ActivatedRoute, useValue: mockRoute }
      ]
    });

    const newFixture = TestBed.createComponent(UsersComponent);
    const newComponent = newFixture.componentInstance;
    newFixture.detectChanges();

    expect(newComponent.title).toBe('Administrators');
  });

  it('should not update title when url has only one segment', () => {
    const mockRoute = {
      url: of([
        { path: 'users', parameters: {} }
      ])
    };

    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      imports: [ UsersComponent ],
      providers: [
        { provide: ActivatedRoute, useValue: mockRoute }
      ]
    });

    const newFixture = TestBed.createComponent(UsersComponent);
    const newComponent = newFixture.componentInstance;
    newFixture.detectChanges();

    expect(newComponent.title).toBe('Users');
  });
});
