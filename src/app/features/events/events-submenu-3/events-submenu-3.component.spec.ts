import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsSubmenu3Component } from './events-submenu-3.component';

describe('EventsSubmenu3Component', () => {
  let component: EventsSubmenu3Component;
  let fixture: ComponentFixture<EventsSubmenu3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventsSubmenu3Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventsSubmenu3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
