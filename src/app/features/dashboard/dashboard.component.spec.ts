import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { DashboardComponent } from './dashboard.component';
import { ImageService } from '../../shared/services/database/image.service';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let imageServiceSpy: jasmine.SpyObj<ImageService>;

  beforeEach(async () => {
    imageServiceSpy = jasmine.createSpyObj<ImageService>('ImageService', ['getAllImages$', 'saveImage']);
    imageServiceSpy.getAllImages$.and.returnValue(of([]));

    await TestBed.configureTestingModule({
      imports: [ DashboardComponent ],
      providers: [
        { provide: ImageService, useValue: imageServiceSpy }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should reject non-image files', async () => {
    const input = document.createElement('input');
    const file = new File(['test'], 'notes.txt', { type: 'text/plain' });

    Object.defineProperty(input, 'files', {
      value: [file]
    });

    await component.onImageSelected({ target: input } as unknown as Event);

    expect(component.uploadError).toBe('Please select an image file.');
    expect(component.selectedFile).toBeNull();
  });

  it('should save the selected image with the description', async () => {
    const file = new File(['abc'], 'nebula.png', { type: 'image/png' });
    imageServiceSpy.saveImage.and.resolveTo({
      filename: file.name,
      dataUrl: 'data:image/png;base64,YWJj',
      description: 'Deep sky capture',
      uploadedAt: Date.now(),
      fileSize: file.size,
      fileType: file.type
    });

    component.selectedFile = file;
    component.imageDescription = 'Deep sky capture';

    await component.saveImage();

    expect(imageServiceSpy.saveImage).toHaveBeenCalledOnceWith(file, {
      description: 'Deep sky capture'
    });
    expect(component.selectedFile).toBeNull();
    expect(component.imageDescription).toBe('');
  });
});
