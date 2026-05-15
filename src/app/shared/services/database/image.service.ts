import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { DatabaseService, ImageDocument } from './database.service';

export interface ImageUploadMetadata {
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  constructor(private readonly dbService: DatabaseService) {}

  getAllImages$(): Observable<ImageDocument[]> {
    return from(this.dbService.getDatabase()).pipe(
      switchMap((db) => db.images.find({
        sort: [{ uploadedAt: 'desc' }]
      }).$),
      map((docs: any[]) => docs.map((doc) => doc.toJSON() as ImageDocument))
    );
  }

  async saveImage(file: File, metadata: ImageUploadMetadata): Promise<ImageDocument> {
    const db = await this.dbService.getDatabase();
    const dataUrl = await this.readFileAsDataUrl(file);
    const imageRecord: ImageDocument = {
      filename: file.name,
      dataUrl,
      description: metadata.description.trim(),
      uploadedAt: Date.now(),
      fileSize: file.size,
      fileType: file.type || 'application/octet-stream'
    };

    // Use upsert to support both first-time inserts and replacement by filename key.
    const savedDocument = await db.images.upsert(imageRecord);
    return savedDocument.toJSON();
  }

  private readFileAsDataUrl(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (typeof reader.result === 'string') {
          resolve(reader.result);
          return;
        }

        reject(new Error('Unable to read image data.'));
      };

      reader.onerror = () => {
        reject(reader.error ?? new Error('Unable to read image data.'));
      };

      reader.readAsDataURL(file);
    });
  }
}