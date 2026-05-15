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

  it('should load product data and stored images on init', () => {
    component.ngOnInit();

    expect(imageServiceSpy.getAllImages$).toHaveBeenCalled();
    expect(component.productData.length).toBe(20);
    expect(component.productData[0].id).toBe('P001');
    expect(component.productData[19].id).toBe('P020');
  });

  it('should format file sizes across all units', () => {
    expect(component.formatFileSize(512)).toBe('512 B');
    expect(component.formatFileSize(1536)).toBe('1.5 KB');
    expect(component.formatFileSize(2 * 1024 * 1024)).toBe('2.0 MB');
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
    expect(input.value).toBe('');
  });

  it('should clear previous upload state when no file is selected', async () => {
    component.selectedFile = new File(['old'], 'old.png', { type: 'image/png' });
    component.selectedFileName = 'old.png';
    component.selectedFileSize = 123;
    component.selectedFileType = 'image/png';
    component.selectedImagePreview = 'data:image/png;base64,old';
    component.uploadError = 'Previous error';

    const input = document.createElement('input');
    Object.defineProperty(input, 'files', { value: [] });

    await component.onImageSelected({ target: input } as unknown as Event);

    expect(component.selectedFile).toBeNull();
    expect(component.selectedFileName).toBe('');
    expect(component.selectedFileSize).toBe(0);
    expect(component.selectedFileType).toBe('');
    expect(component.selectedImagePreview).toBe('');
    expect(component.uploadError).toBe('');
  });

  it('should populate image details when a valid image is selected', async () => {
    const file = new File(['abc'], 'nebula.png', { type: 'image/png' });
    const input = document.createElement('input');

    Object.defineProperty(input, 'files', { value: [file] });
    spyOn<any>(component, 'readFileAsDataUrl').and.resolveTo('data:image/png;base64,YWJj');

    await component.onImageSelected({ target: input } as unknown as Event);

    expect(component['readFileAsDataUrl']).toHaveBeenCalledOnceWith(file);
    expect(component.selectedFile).toBe(file);
    expect(component.selectedFileName).toBe('nebula.png');
    expect(component.selectedFileSize).toBe(file.size);
    expect(component.selectedFileType).toBe('image/png');
    expect(component.selectedImagePreview).toBe('data:image/png;base64,YWJj');
    expect(component.uploadError).toBe('');
  });

  it('should save the selected image with the description', async () => {
    const file = new File(['abc'], 'nebula.png', { type: 'image/png' });
    imageServiceSpy.saveImage.and.returnValue(Promise.resolve({
      filename: file.name,
      dataUrl: 'data:image/png;base64,YWJj',
      description: 'Deep sky capture',
      uploadedAt: Date.now(),
      fileSize: file.size,
      fileType: file.type
    }));

    component.selectedFile = file;
    component.imageDescription = 'Deep sky capture';

    await component.saveImage();

    expect(imageServiceSpy.saveImage).toHaveBeenCalledOnceWith(file, {
      description: 'Deep sky capture'
    });
    expect(component.selectedFile).toBeNull();
    expect(component.imageDescription).toBe('');
    expect(component.selectedImagePreview).toBe('');
    expect(component.uploadError).toBe('');
  });

  it('should reject saving when no file is selected', async () => {
    component.selectedFile = null;

    await component.saveImage();

    expect(imageServiceSpy.saveImage).not.toHaveBeenCalled();
    expect(component.uploadError).toBe('Select an image before saving.');
  });

  it('should surface save errors and stop saving state', async () => {
    const file = new File(['abc'], 'nebula.png', { type: 'image/png' });
    imageServiceSpy.saveImage.and.returnValue(Promise.reject(new Error('database unavailable')));

    component.selectedFile = file;
    component.imageDescription = 'Deep sky capture';

    await component.saveImage();

    expect(component.isSavingImage).toBeFalse();
    expect(component.uploadError).toBe('Image upload failed: database unavailable');
  });

  it('should surface preview errors from FileReader', async () => {
    const originalFileReader = globalThis.FileReader;

    class MockFileReader {
      result: string | ArrayBuffer | null = null;
      error: any = null;
      onload: (() => void) | null = null;
      onerror: (() => void) | null = null;

      readAsDataURL(): void {
        this.error = new Error('Unable to generate preview.');
        this.onerror?.();
      }
    }

    (globalThis as any).FileReader = MockFileReader;

    try {
      await expectAsync((component as any).readFileAsDataUrl(new File(['abc'], 'broken.png', { type: 'image/png' })))
        .toBeRejectedWithError('Unable to generate preview.');
    } finally {
      (globalThis as any).FileReader = originalFileReader;
    }
  });
});
