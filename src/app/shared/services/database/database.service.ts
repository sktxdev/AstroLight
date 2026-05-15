import { Injectable } from '@angular/core';
import { createRxDatabase, RxDatabase, addRxPlugin, RxCollection } from 'rxdb';
import { getRxStorageDexie } from 'rxdb/plugins/storage-dexie';
import { RxDBQueryBuilderPlugin } from 'rxdb/plugins/query-builder';
import { RxDBUpdatePlugin } from 'rxdb/plugins/update';

addRxPlugin(RxDBQueryBuilderPlugin);
addRxPlugin(RxDBUpdatePlugin);

export interface UserDocument {
  id: string;
  name: string;
  email: string;
  createdAt: number;
  updatedAt: number;
}

export interface ImageDocument {
  filename: string;
  dataUrl: string;
  description: string;
  uploadedAt: number;
  fileSize: number;
  fileType: string;
}

// Define collections interface
export interface MyDatabaseCollections {
  users: RxCollection<UserDocument>;
  images: RxCollection<ImageDocument>;
}

// Define custom database type
export type MyDatabase = RxDatabase<MyDatabaseCollections>;

const userSchema = {
  version: 0,
  primaryKey: 'id',
  type: 'object',
  properties: {
    id: {
      type: 'string',
      maxLength: 100
    },
    name: {
      type: 'string',
      maxLength: 200
    },
    email: {
      type: 'string',
      maxLength: 200
    },
    createdAt: {
      type: 'number',
      minimum: 0,
      maximum: Number.MAX_SAFE_INTEGER,
      multipleOf: 1
    },
    updatedAt: {
      type: 'number',
      minimum: 0,
      maximum: Number.MAX_SAFE_INTEGER,
      multipleOf: 1
    }
  },
  required: ['id', 'name', 'email', 'createdAt', 'updatedAt'],
  indexes: ['createdAt', 'email']
};

const imageSchema = {
  version: 0,
  primaryKey: 'filename',
  type: 'object',
  properties: {
    filename: {
      type: 'string',
      maxLength: 255
    },
    dataUrl: {
      type: 'string'
    },
    description: {
      type: 'string',
      maxLength: 500
    },
    uploadedAt: {
      type: 'number',
      minimum: 0,
      maximum: Number.MAX_SAFE_INTEGER,
      multipleOf: 1
    },
    fileSize: {
      type: 'number',
      minimum: 0,
      maximum: Number.MAX_SAFE_INTEGER,
      multipleOf: 1
    },
    fileType: {
      type: 'string',
      maxLength: 100
    }
  },
  required: ['filename', 'dataUrl', 'description', 'uploadedAt', 'fileSize', 'fileType'],
  indexes: ['uploadedAt', 'fileType']
};

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private db: MyDatabase | null = null;
  private initPromise: Promise<MyDatabase> | null = null;

  constructor() {}

  async getDatabase(): Promise<MyDatabase> {
    if (this.db) {
      return this.db;
    }

    if (this.initPromise) {
      return this.initPromise;
    }

    this.initPromise = this.initDatabase();
    this.db = await this.initPromise;
    return this.db;
  }

  private async initDatabase(): Promise<MyDatabase> {
    console.log('Initializing RxDB database...');

    const db = await createRxDatabase<MyDatabaseCollections>({
      name: 'astrolight',
      // Keep storage CSP-safe for Electron/browser contexts that disallow unsafe-eval.
      storage: getRxStorageDexie(),
      multiInstance: true,
      eventReduce: true,
      cleanupPolicy: {}
    });

    console.log('Database created');

    // Add collections
    await db.addCollections({
      users: {
        schema: userSchema
      },
      images: {
        schema: imageSchema
      }
    });

    console.log('Collections created');

    return db;
  }

  async destroy(): Promise<void> {
    if (this.db) {
      await this.db.remove();
      this.db = null;
      this.initPromise = null;
    }
  }
}
