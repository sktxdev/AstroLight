import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsSubmenu1Component } from './events-submenu-1.component';

describe('EventsSubmenu1Component', () => {
  let component: EventsSubmenu1Component;
  let fixture: ComponentFixture<EventsSubmenu1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventsSubmenu1Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventsSubmenu1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
