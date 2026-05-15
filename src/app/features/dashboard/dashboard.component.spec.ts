import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ DashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should load image entries from localStorage on init', () => {
    localStorage.setItem('chart.png', 'data:image/png;base64,abc');
    localStorage.setItem('theme', 'dark');

    fixture.detectChanges();

    expect(component.storedImages).toEqual([
      { key: 'chart.png', dataUrl: 'data:image/png;base64,abc' }
    ]);
  });

  it('should store uploaded images by filename key', async () => {
    const imageFile = new File(['image-data'], 'photo.jpg', { type: 'image/jpeg' });
    spyOn(component as any, 'readFileAsDataUrl').and.resolveTo('data:image/jpeg;base64,xyz');

    await (component as any).handleFiles([imageFile]);

    expect(localStorage.getItem('photo.jpg')).toBe('data:image/jpeg;base64,xyz');
    expect(component.storedImages).toEqual([
      { key: 'photo.jpg', dataUrl: 'data:image/jpeg;base64,xyz' }
    ]);
  });

  it('should ignore non-image uploads', async () => {
    const textFile = new File(['hello'], 'note.txt', { type: 'text/plain' });
    const fileReadSpy = spyOn(component as any, 'readFileAsDataUrl');

    await (component as any).handleFiles([textFile]);

    expect(fileReadSpy).not.toHaveBeenCalled();
    expect(localStorage.getItem('note.txt')).toBeNull();
    expect(component.storedImages).toEqual([]);
  });
});
