import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { MenuItemComponent, MenuItem } from './menu-item.component';

describe('MenuItemComponent', () => {
  let component: MenuItemComponent;
  let fixture: ComponentFixture<MenuItemComponent>;

  const mockMenuItem: MenuItem = {
    icon: 'home',
    label: 'Test Item',
    route: '/test',
    children: []
  };

  const mockMenuItemWithChildren: MenuItem = {
    icon: 'folder',
    label: 'Parent Item',
    route: '',
    children: [
      { icon: 'file', label: 'Child 1', route: '/child1' },
      { icon: 'file', label: 'Child 2', route: '/child2' }
    ]
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ MenuItemComponent ],
      providers: [ provideRouter([]) ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuItemComponent);
    component = fixture.componentInstance;
    component.item = mockMenuItem;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle menu when toggleMenu is called', () => {
    const key = 'test-key';
    expect(component.isExpanded(key)).toBeFalsy();

    component.toggleMenu(key);
    expect(component.isExpanded(key)).toBeTruthy();

    component.toggleMenu(key);
    expect(component.isExpanded(key)).toBeFalsy();
  });

  it('should detect if item has children', () => {
    component.item = mockMenuItem;
    expect(component.hasChildren(component.item)).toBeFalsy();

    component.item = mockMenuItemWithChildren;
    expect(component.hasChildren(component.item)).toBeTruthy();
  });

  it('should generate correct menu key', () => {
    component.path = '';
    expect(component.getMenuKey('Item')).toBe('Item');

    component.path = 'Parent';
    expect(component.getMenuKey('Child')).toBe('Parent-Child');
  });

  it('should calculate padding based on level', () => {
    component.level = 0;
    expect(component.getPaddingLeft()).toBe('20px');

    component.level = 1;
    expect(component.getPaddingLeft()).toBe('40px');

    component.level = 2;
    expect(component.getPaddingLeft()).toBe('60px');
  });

  it('should calculate font size based on level', () => {
    component.level = 0;
    expect(component.getFontSize()).toBe('14px');

    component.level = 1;
    expect(component.getFontSize()).toBe('13px');

    component.level = 4;
    expect(component.getFontSize()).toBe('10px');

    component.level = 10;
    expect(component.getFontSize()).toBe('10px');
  });

  it('should calculate icon size based on level', () => {
    component.level = 0;
    expect(component.getIconSize()).toBe('20px');

    component.level = 1;
    expect(component.getIconSize()).toBe('18px');

    component.level = 4;
    expect(component.getIconSize()).toBe('12px');

    component.level = 10;
    expect(component.getIconSize()).toBe('12px');
  });
});
