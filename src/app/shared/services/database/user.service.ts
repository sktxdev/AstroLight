import { Injectable } from '@angular/core';
import { DatabaseService, UserDocument } from '../database/database.service';
import { Observable, from } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private dbService: DatabaseService) {}

  // Create a new user
  async createUser(user: Omit<UserDocument, 'id' | 'createdAt' | 'updatedAt'>): Promise<UserDocument> {
    const db = await this.dbService.getDatabase();
    const now = Date.now();
    const newUser: UserDocument = {
      id: this.generateId(),
      ...user,
      createdAt: now,
      updatedAt: now
    };

    const result = await db.users.insert(newUser);
    return result.toJSON() as UserDocument;
  }

  // Get all users as Observable
  getAllUsers$(): Observable<UserDocument[]> {
    return from(this.dbService.getDatabase()).pipe(
      switchMap(db => db.users.find().$),
      map((docs: any[]) => docs.map(doc => doc.toJSON() as UserDocument))
    );
  }

  // Get user by ID
  async getUserById(id: string): Promise<UserDocument | null> {
    const db = await this.dbService.getDatabase();
    const doc = await db.users.findOne(id).exec();
    return doc ? doc.toJSON() as UserDocument : null;
  }

  // Update user
  async updateUser(id: string, updates: Partial<Omit<UserDocument, 'id' | 'createdAt'>>): Promise<UserDocument | null> {
    const db = await this.dbService.getDatabase();
    const doc = await db.users.findOne(id).exec();

    if (!doc) {
      return null;
    }

    const updatedDoc = await doc.incrementalPatch({
      ...updates,
      updatedAt: Date.now()
    });

    // Return the updated document
    return updatedDoc.toJSON() as UserDocument;
  }

  // Delete user
  async deleteUser(id: string): Promise<boolean> {
    const db = await this.dbService.getDatabase();
    const doc = await db.users.findOne(id).exec();

    if (!doc) {
      return false;
    }

    await doc.remove();
    return true;
  }

  // Search users by email
  async searchByEmail(email: string): Promise<UserDocument[]> {
    const db = await this.dbService.getDatabase();
    const docs = await db.users.find({
      selector: {
        email: {
          $regex: email
        }
      }
    }).exec();

    return docs.map(doc => doc.toJSON() as UserDocument);
  }

  // Get users sorted by creation date
  async getUsersSortedByDate(): Promise<UserDocument[]> {
    const db = await this.dbService.getDatabase();
    const docs = await db.users.find({
      sort: [{ createdAt: 'desc' }]
    }).exec();

    return docs.map(doc => doc.toJSON() as UserDocument);
  }

  private generateId(): string {
    return `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}
