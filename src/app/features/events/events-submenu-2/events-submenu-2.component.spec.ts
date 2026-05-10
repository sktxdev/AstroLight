import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsSubmenu2Component } from './events-submenu-2.component';

describe('EventsSubmenu2Component', () => {
  let component: EventsSubmenu2Component;
  let fixture: ComponentFixture<EventsSubmenu2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventsSubmenu2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventsSubmenu2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
