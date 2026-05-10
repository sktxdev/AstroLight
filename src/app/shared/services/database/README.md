# RxDB Integration

RxDB has been integrated into the Angular Dashboard Template for local database storage using IndexedDB.

## Overview

- **Database Service**: Core service for initializing and managing the RxDB database
- **User Service**: Example service demonstrating CRUD operations with RxDB
- **Storage**: Uses Dexie.js adapter for IndexedDB (browser storage)
- **Collections**: Currently includes a `users` collection

## Services

### DatabaseService

Located at: `src/app/shared/services/database/database.service.ts`

Core database initialization and management service.

**Methods:**
- `getDatabase()`: Returns the initialized RxDB instance
- `destroy()`: Destroys the database connection

### UserService

Located at: `src/app/shared/services/database/user.service.ts`

Example service showing how to interact with RxDB collections.

**Methods:**
- `createUser(user)`: Create a new user
- `getAllUsers$()`: Get all users as Observable
- `getUserById(id)`: Get user by ID
- `updateUser(id, updates)`: Update user data
- `deleteUser(id)`: Delete a user
- `searchByEmail(email)`: Search users by email
- `getUsersSortedByDate()`: Get users sorted by creation date

## Usage Example

### In a Component

```typescript
import { Component, OnInit } from '@angular/core';
import { UserService } from './shared/services/database/user.service';
import { UserDocument } from './shared/services/database/database.service';

@Component({
  selector: 'app-example',
  template: `
    <div *ngFor="let user of users">
      {{ user.name }} - {{ user.email }}
    </div>
  `
})
export class ExampleComponent implements OnInit {
  users: UserDocument[] = [];

  constructor(private userService: UserService) {}

  async ngOnInit() {
    // Create a user
    await this.userService.createUser({
      name: 'John Doe',
      email: 'john@example.com'
    });

    // Get all users
    this.userService.getAllUsers$().subscribe(users => {
      this.users = users;
    });
  }

  async updateUser(id: string) {
    await this.userService.updateUser(id, {
      name: 'Jane Doe'
    });
  }

  async deleteUser(id: string) {
    await this.userService.deleteUser(id);
  }
}
```

## Adding New Collections

To add a new collection, update the `database.service.ts`:

1. **Define the document interface:**

```typescript
export interface TodoDocument {
  id: string;
  title: string;
  completed: boolean;
  createdAt: number;
}
```

2. **Define the schema:**

```typescript
const todoSchema = {
  version: 0,
  primaryKey: 'id',
  type: 'object',
  properties: {
    id: { type: 'string', maxLength: 100 },
    title: { type: 'string' },
    completed: { type: 'boolean' },
    createdAt: {
      type: 'number',
      minimum: 0,
      maximum: Number.MAX_SAFE_INTEGER,
      multipleOf: 1
    }
  },
  required: ['id', 'title', 'completed', 'createdAt']
};
```

3. **Add to collections in initDatabase():**

```typescript
await db.addCollections({
  users: { schema: userSchema },
  todos: { schema: todoSchema }  // Add new collection
});
```

4. **Create a service for the collection** (similar to UserService)

## Features

- ✅ **Reactive**: Real-time updates using RxJS Observables
- ✅ **Offline-First**: Data persists in IndexedDB
- ✅ **Type-Safe**: Full TypeScript support
- ✅ **Querying**: Powerful query capabilities with selectors
- ✅ **Validation**: Schema validation using AJV
- ✅ **Multi-Tab**: Multi-instance support for multiple browser tabs

## Testing

Tests are included for both services:
- `database.service.spec.ts`: Tests database initialization
- `user.service.spec.ts`: Tests CRUD operations

Run tests with:
```bash
npm test
```

## Performance Considerations

- RxDB uses IndexedDB which has a storage limit (typically ~50-100MB)
- For larger datasets, consider implementing pagination
- Use indexes on frequently queried fields
- Clean up subscriptions in components to prevent memory leaks

## Resources

- [RxDB Documentation](https://rxdb.info/)
- [Dexie.js Documentation](https://dexie.org/)
