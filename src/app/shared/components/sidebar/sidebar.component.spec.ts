import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { SidebarComponent } from './sidebar.component';

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;
  const storageKey = 'astrolight.currentNavWidth';

  beforeEach(async () => {
    // Clear localStorage before each test
    localStorage.clear();

    await TestBed.configureTestingModule({
      imports: [ SidebarComponent ],
      providers: [ provideRouter([]) ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    // Clean up localStorage and body classes after each test
    localStorage.clear();
    document.body.classList.remove('resizing');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default width', () => {
    expect(component.sidebarWidth).toBe(250);
  });

  it('should load saved width from localStorage on init', () => {
    localStorage.setItem(storageKey, '300');

    const newFixture = TestBed.createComponent(SidebarComponent);
    const newComponent = newFixture.componentInstance;
    newFixture.detectChanges();

    expect(newComponent.sidebarWidth).toBe(300);
  });

  it('should not load width if it is below minimum', () => {
    localStorage.setItem(storageKey, '100');

    const newFixture = TestBed.createComponent(SidebarComponent);
    const newComponent = newFixture.componentInstance;
    newFixture.detectChanges();

    expect(newComponent.sidebarWidth).toBe(250);
  });

  it('should not load width if it is above maximum', () => {
    localStorage.setItem(storageKey, '600');

    const newFixture = TestBed.createComponent(SidebarComponent);
    const newComponent = newFixture.componentInstance;
    newFixture.detectChanges();

    expect(newComponent.sidebarWidth).toBe(250);
  });

  it('should set isResizing to true when resize handle is pressed', () => {
    const event = new MouseEvent('mousedown', { clientX: 250 });
    component.onResizeHandleMouseDown(event);

    expect(component.isResizing).toBeTruthy();
    expect(document.body.classList.contains('resizing')).toBeTruthy();
  });

  it('should update width during mouse move when resizing', () => {
    const mouseDownEvent = new MouseEvent('mousedown', { clientX: 250 });
    component.onResizeHandleMouseDown(mouseDownEvent);

    const mouseMoveEvent = new MouseEvent('mousemove', { clientX: 300 });
    component.onMouseMove(mouseMoveEvent);

    expect(component.sidebarWidth).toBe(300);
  });

  it('should not update width below minimum during resize', () => {
    component.sidebarWidth = 200;
    const mouseDownEvent = new MouseEvent('mousedown', { clientX: 200 });
    component.onResizeHandleMouseDown(mouseDownEvent);

    const mouseMoveEvent = new MouseEvent('mousemove', { clientX: 100 });
    component.onMouseMove(mouseMoveEvent);

    expect(component.sidebarWidth).toBe(200);
  });

  it('should not update width above maximum during resize', () => {
    component.sidebarWidth = 400;
    const mouseDownEvent = new MouseEvent('mousedown', { clientX: 400 });
    component.onResizeHandleMouseDown(mouseDownEvent);

    const mouseMoveEvent = new MouseEvent('mousemove', { clientX: 600 });
    component.onMouseMove(mouseMoveEvent);

    expect(component.sidebarWidth).toBe(400);
  });

  it('should save width to localStorage on mouse up', () => {
    const mouseDownEvent = new MouseEvent('mousedown', { clientX: 250 });
    component.onResizeHandleMouseDown(mouseDownEvent);

    const mouseMoveEvent = new MouseEvent('mousemove', { clientX: 320 });
    component.onMouseMove(mouseMoveEvent);

    component.onMouseUp();

    expect(localStorage.getItem(storageKey)).toBe('320');
    expect(component.isResizing).toBeFalsy();
    expect(document.body.classList.contains('resizing')).toBeFalsy();
  });

  it('should have menu items defined', () => {
    expect(component.menuItems).toBeDefined();
    expect(component.menuItems.length).toBeGreaterThan(0);
  });

  it('should have nested menu structure', () => {
    const settingsMenu = component.menuItems.find(item => item.label === 'Settings');
    expect(settingsMenu).toBeDefined();

    const themeMenu = settingsMenu?.children?.find((child: any) => child.label === 'Theme');
    expect(themeMenu).toBeDefined();
  });

  it('should support 2 levels of nesting', () => {
    const settingsMenu = component.menuItems.find(item => item.label === 'Settings');
    expect(settingsMenu?.children).toBeDefined();

    const themeMenu = settingsMenu?.children?.find((child: any) => child.label === 'Theme');
    expect(themeMenu).toBeDefined();
    expect(themeMenu?.children).toBeUndefined();
  });

  it('should have correct menu structure for About', () => {
    const aboutMenu = component.menuItems.find(item => item.label === 'About');
    expect(aboutMenu).toBeDefined();
    expect(aboutMenu?.children?.length).toBe(2);
  });

  it('should not do anything on mouse move when not resizing', () => {
    component.isResizing = false;
    const initialWidth = component.sidebarWidth;

    const mouseMoveEvent = new MouseEvent('mousemove', { clientX: 400 });
    component.onMouseMove(mouseMoveEvent);

    expect(component.sidebarWidth).toBe(initialWidth);
  });

  it('should not save to localStorage on mouse up when not resizing', () => {
    component.isResizing = false;
    localStorage.clear();

    component.onMouseUp();

    expect(localStorage.getItem(storageKey)).toBeNull();
  });

  it('should call updateSidebarWidth when width changes during resize', () => {
    spyOn<any>(component, 'updateSidebarWidth');

    const mouseDownEvent = new MouseEvent('mousedown', { clientX: 250 });
    component.onResizeHandleMouseDown(mouseDownEvent);

    const mouseMoveEvent = new MouseEvent('mousemove', { clientX: 300 });
    component.onMouseMove(mouseMoveEvent);

    expect(component['updateSidebarWidth']).toHaveBeenCalled();
  });

  it('should prevent default on resize handle mouse down', () => {
    const event = new MouseEvent('mousedown', { clientX: 250 });
    spyOn(event, 'preventDefault');

    component.onResizeHandleMouseDown(event);

    expect(event.preventDefault).toHaveBeenCalled();
  });

  it('should have My Image Library menu item with empty children', () => {
    const imageLibraryMenu = component.menuItems.find(item => item.label === 'My Image Library');
    expect(imageLibraryMenu).toBeDefined();
    expect(imageLibraryMenu?.route).toBe('/');
    expect(imageLibraryMenu?.children?.length).toBe(0);
  });

  it('should have Settings menu with Theme only', () => {
    const settingsMenu = component.menuItems.find(item => item.label === 'Settings');
    expect(settingsMenu).toBeDefined();

    const themeMenu = settingsMenu?.children?.find((child: any) => child.label === 'Theme');

    expect(themeMenu).toBeDefined();
    expect(themeMenu?.route).toBe('/settings/theme');
    expect(settingsMenu?.children?.length).toBe(1);
  });

  it('should maintain width within bounds when dragging left', () => {
    component.sidebarWidth = 200;
    const mouseDownEvent = new MouseEvent('mousedown', { clientX: 200 });
    component.onResizeHandleMouseDown(mouseDownEvent);

    // Try to drag to 140px (below minimum of 150)
    const mouseMoveEvent = new MouseEvent('mousemove', { clientX: 140 });
    component.onMouseMove(mouseMoveEvent);

    // Should stay at 200 because 140 is below minimum
    expect(component.sidebarWidth).toBe(200);
  });

  it('should maintain width within bounds when dragging right', () => {
    component.sidebarWidth = 450;
    const mouseDownEvent = new MouseEvent('mousedown', { clientX: 450 });
    component.onResizeHandleMouseDown(mouseDownEvent);

    // Try to drag to 600px (above maximum of 500)
    const mouseMoveEvent = new MouseEvent('mousemove', { clientX: 600 });
    component.onMouseMove(mouseMoveEvent);

    // Should stay at 450 because 600 is above maximum
    expect(component.sidebarWidth).toBe(450);
  });

  it('should accept width at exactly minimum value', () => {
    component.sidebarWidth = 200;
    const mouseDownEvent = new MouseEvent('mousedown', { clientX: 200 });
    component.onResizeHandleMouseDown(mouseDownEvent);

    // Drag to exactly minimum (150)
    const mouseMoveEvent = new MouseEvent('mousemove', { clientX: 150 });
    component.onMouseMove(mouseMoveEvent);

    expect(component.sidebarWidth).toBe(150);
  });

  it('should accept width at exactly maximum value', () => {
    component.sidebarWidth = 450;
    const mouseDownEvent = new MouseEvent('mousedown', { clientX: 450 });
    component.onResizeHandleMouseDown(mouseDownEvent);

    // Drag to exactly maximum (500)
    const mouseMoveEvent = new MouseEvent('mousemove', { clientX: 500 });
    component.onMouseMove(mouseMoveEvent);

    expect(component.sidebarWidth).toBe(500);
  });

  it('should load width from localStorage at boundary values', () => {
    localStorage.setItem(storageKey, '150');

    const newFixture = TestBed.createComponent(SidebarComponent);
    const newComponent = newFixture.componentInstance;
    newFixture.detectChanges();

    expect(newComponent.sidebarWidth).toBe(150);
  });

  it('should load maximum width from localStorage', () => {
    localStorage.setItem(storageKey, '500');

    const newFixture = TestBed.createComponent(SidebarComponent);
    const newComponent = newFixture.componentInstance;
    newFixture.detectChanges();

    expect(newComponent.sidebarWidth).toBe(500);
  });

  it('should handle invalid localStorage value gracefully', () => {
    localStorage.setItem(storageKey, 'invalid');

    const newFixture = TestBed.createComponent(SidebarComponent);
    const newComponent = newFixture.componentInstance;
    newFixture.detectChanges();

    expect(newComponent.sidebarWidth).toBe(250);
  });

  it('should dispatch window resize event when updating sidebar width', () => {
    spyOn(globalThis, 'dispatchEvent');

    component['updateSidebarWidth']();

    expect(globalThis.dispatchEvent).toHaveBeenCalledWith(jasmine.any(Event));
  });

  it('should store startX and startWidth when starting resize', () => {
    component.sidebarWidth = 300;
    const mouseDownEvent = new MouseEvent('mousedown', { clientX: 350 });

    component.onResizeHandleMouseDown(mouseDownEvent);

    expect(component['startX']).toBe(350);
    expect(component['startWidth']).toBe(300);
  });

  it('should calculate delta correctly during resize', () => {
    component.sidebarWidth = 250;
    const mouseDownEvent = new MouseEvent('mousedown', { clientX: 250 });
    component.onResizeHandleMouseDown(mouseDownEvent);

    // Move 50px to the right
    const mouseMoveEvent = new MouseEvent('mousemove', { clientX: 300 });
    component.onMouseMove(mouseMoveEvent);

    expect(component.sidebarWidth).toBe(300);
  });

  it('should have correct icon for each menu item', () => {
    const imageLibraryMenu = component.menuItems.find(item => item.label === 'My Image Library');
    const settingsMenu = component.menuItems.find(item => item.label === 'Settings');
    const aboutMenu = component.menuItems.find(item => item.label === 'About');

    expect(imageLibraryMenu?.icon).toBe('home');
    expect(settingsMenu?.icon).toBe('settings');
    expect(aboutMenu?.icon).toBe('info');
  });

  it('should have Contact and Software under About menu', () => {
    const aboutMenu = component.menuItems.find(item => item.label === 'About');
    const contactMenu = aboutMenu?.children?.find((child: any) => child.label === 'Contact');
    const softwareMenu = aboutMenu?.children?.find((child: any) => child.label === 'Software');

    expect(contactMenu).toBeDefined();
    expect(contactMenu?.route).toBe('/about/contact');
    expect(softwareMenu).toBeDefined();
    expect(softwareMenu?.route).toBe('/about/software');
  });

  it('should handle updateSidebarWidth when sidebar element does not exist', () => {
    spyOn(component['elementRef'].nativeElement, 'querySelector').and.returnValue(null);
    spyOn(component['elementRef'].nativeElement, 'closest').and.returnValue(null);
    spyOn(globalThis, 'dispatchEvent');

    component['updateSidebarWidth']();

    expect(globalThis.dispatchEvent).toHaveBeenCalled();
  });

  it('should handle updateSidebarWidth when drawer element does not exist', () => {
    const mockSidebarElement = document.createElement('div');
    spyOn(component['elementRef'].nativeElement, 'querySelector').and.returnValue(mockSidebarElement);
    spyOn(component['elementRef'].nativeElement, 'closest').and.returnValue(null);
    spyOn(globalThis, 'dispatchEvent');

    component['updateSidebarWidth']();

    expect(mockSidebarElement.style.width).toBe(`${component.sidebarWidth}px`);
    expect(globalThis.dispatchEvent).toHaveBeenCalled();
  });

  it('should update both sidebar and drawer elements when they exist', () => {
    const mockSidebarElement = document.createElement('div');
    const mockDrawerElement = document.createElement('div');
    spyOn(component['elementRef'].nativeElement, 'querySelector').and.returnValue(mockSidebarElement);
    spyOn(component['elementRef'].nativeElement, 'closest').and.returnValue(mockDrawerElement);
    spyOn(globalThis, 'dispatchEvent');

    component['updateSidebarWidth']();

    expect(mockSidebarElement.style.width).toBe(`${component.sidebarWidth}px`);
    expect(mockDrawerElement.style.width).toBe(`${component.sidebarWidth}px`);
    expect(mockDrawerElement.style.minWidth).toBe(`${component.sidebarWidth}px`);
    expect(mockDrawerElement.style.maxWidth).toBe(`${component.sidebarWidth}px`);
    expect(globalThis.dispatchEvent).toHaveBeenCalled();
  });

  it('should call updateSidebarWidth during ngOnInit', () => {
    spyOn<any>(SidebarComponent.prototype, 'updateSidebarWidth');

    const newFixture = TestBed.createComponent(SidebarComponent);
    newFixture.detectChanges();

    expect(SidebarComponent.prototype['updateSidebarWidth']).toHaveBeenCalled();
  });

  it('should handle empty localStorage value', () => {
    localStorage.setItem(storageKey, '');

    const newFixture = TestBed.createComponent(SidebarComponent);
    const newComponent = newFixture.componentInstance;
    newFixture.detectChanges();

    expect(newComponent.sidebarWidth).toBe(250);
  });

  it('should handle NaN from parseInt', () => {
    localStorage.setItem(storageKey, 'abc123');

    const newFixture = TestBed.createComponent(SidebarComponent);
    const newComponent = newFixture.componentInstance;
    newFixture.detectChanges();

    expect(newComponent.sidebarWidth).toBe(250);
  });

  it('should inject ElementRef in constructor', () => {
    expect(component['elementRef']).toBeDefined();
  });

  it('should not update width when new width equals MIN_WIDTH minus 1', () => {
    component.sidebarWidth = 200;
    const mouseDownEvent = new MouseEvent('mousedown', { clientX: 200 });
    component.onResizeHandleMouseDown(mouseDownEvent);

    // Try to set width to 149 (below MIN_WIDTH of 150)
    const mouseMoveEvent = new MouseEvent('mousemove', { clientX: 149 });
    component.onMouseMove(mouseMoveEvent);

    expect(component.sidebarWidth).toBe(200);
  });

  it('should not update width when new width equals MAX_WIDTH plus 1', () => {
    component.sidebarWidth = 400;
    const mouseDownEvent = new MouseEvent('mousedown', { clientX: 400 });
    component.onResizeHandleMouseDown(mouseDownEvent);

    // Try to set width to 501 (above MAX_WIDTH of 500)
    const mouseMoveEvent = new MouseEvent('mousemove', { clientX: 501 });
    component.onMouseMove(mouseMoveEvent);

    expect(component.sidebarWidth).toBe(400);
  });

  it('should have isResizing false by default', () => {
    expect(component.isResizing).toBeFalsy();
  });

  it('should have correct private constants', () => {
    expect(component['STORAGE_KEY']).toBe('astrolight.currentNavWidth');
    expect(component['MIN_WIDTH']).toBe(150);
    expect(component['MAX_WIDTH']).toBe(500);
    expect(component['DEFAULT_WIDTH']).toBe(250);
  });
});
