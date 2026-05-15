// src/app/features/dashboard/dashboard.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { ImageDocument } from '../../shared/services/database/database.service';
import { ImageService } from '../../shared/services/database/image.service';

export interface ProductPerformance {
  id: string;
  productName: string;
  salesVolume: number;
  revenue: number;
  expenses: number;
  profit: number;
  notes: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  productData: ProductPerformance[] = [];
  storedImages$!: Observable<ImageDocument[]>;
  selectedFile: File | null = null;
  selectedFileName = '';
  selectedFileSize = 0;
  selectedFileType = '';
  imageDescription = '';
  selectedImagePreview = '';
  uploadError = '';
  isSavingImage = false;

  constructor(private readonly imageService: ImageService) {}

  ngOnInit(): void {
    this.loadProductData();
    this.storedImages$ = this.imageService.getAllImages$();
  }

  async onImageSelected(event: Event): Promise<void> {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0] ?? null;

    this.clearUploadState();

    if (!file) {
      return;
    }

    if (!file.type.startsWith('image/')) {
      this.uploadError = 'Please select an image file.';
      input.value = '';
      return;
    }

    this.selectedFile = file;
    this.selectedFileName = file.name;
    this.selectedFileSize = file.size;
    this.selectedFileType = file.type || 'application/octet-stream';
    this.selectedImagePreview = await this.readFileAsDataUrl(file);
  }

  async saveImage(): Promise<void> {
    if (!this.selectedFile) {
      this.uploadError = 'Select an image before saving.';
      return;
    }

    this.isSavingImage = true;
    this.uploadError = '';

    try {
      await this.imageService.saveImage(this.selectedFile, {
        description: this.imageDescription
      });
      this.resetImageForm();
    } catch (error) {
      console.error('Failed to save image', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      this.uploadError = `Image upload failed: ${errorMessage}`;
    } finally {
      this.isSavingImage = false;
    }
  }

  formatFileSize(bytes: number): string {
    if (bytes < 1024) {
      return `${bytes} B`;
    }

    if (bytes < 1024 * 1024) {
      return `${(bytes / 1024).toFixed(1)} KB`;
    }

    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }

  private loadProductData(): void {
    const products = [
      'Widget A', 'Gadget B', 'Tool C', 'Device D', 'Appliance E',
      'Component F', 'Module G', 'System H', 'Part I', 'Assembly J',
      'Unit K', 'Item L', 'Product M', 'Solution N', 'Service O',
      'Device P', 'Hardware Q', 'Software R', 'Accessory S', 'Kit T'
    ];

    const notesList = [
      'High demand in Q1', 'Seasonal peak expected', 'New release upcoming',
      'Supply chain delay', 'Competitor analysis needed', 'Customer feedback positive',
      'Inventory low', 'Promotion running', 'Price increase planned', 'End of lifecycle',
      'High margin item', 'Bundled offer', 'Export order pending', 'Customization requested',
      'Stockout risk', 'Marketing campaign started', 'Vendor contract renewal',
      'Quality audit passed', 'Return rate low', 'Pre-order available'
    ];

    this.productData = products.map((name, index) => {
      const salesVolume = Math.floor(Math.random() * 5000) + 500;
      const revenue = Math.floor(Math.random() * 500000) + 50000;
      const expenses = Math.floor(revenue * (0.3 + Math.random() * 0.4));
      const profit = revenue - expenses;

      return {
        id: `P${String(index + 1).padStart(3, '0')}`,
        productName: name,
        salesVolume,
        revenue,
        expenses,
        profit,
        notes: notesList[index]
      };
    });
  }

  private clearUploadState(): void {
    this.uploadError = '';
    this.selectedFile = null;
    this.selectedFileName = '';
    this.selectedFileSize = 0;
    this.selectedFileType = '';
    this.selectedImagePreview = '';
  }

  private resetImageForm(): void {
    this.clearUploadState();
    this.imageDescription = '';
  }

  private readFileAsDataUrl(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (typeof reader.result === 'string') {
          resolve(reader.result);
          return;
        }

        reject(new Error('Unable to generate preview.'));
      };

      reader.onerror = () => {
        reject(reader.error ?? new Error('Unable to generate preview.'));
      };

      reader.readAsDataURL(file);
    });
  }
}