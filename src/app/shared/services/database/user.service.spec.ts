import { TestBed } from '@angular/core/testing';
import { UserService } from './user.service';
import { DatabaseService } from './database.service';

describe('UserService', () => {
  let service: UserService;
  let dbService: DatabaseService;

  beforeEach(async () => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserService);
    dbService = TestBed.inject(DatabaseService);
  });

  afterEach(async () => {
    try {
      await dbService.destroy();
    } catch (e) {
      console.error('Error destroying database:', e);
    }
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create a user', async () => {
    const user = await service.createUser({
      name: 'Test User',
      email: 'test@example.com'
    });

    expect(user).toBeTruthy();
    expect(user.name).toBe('Test User');
    expect(user.email).toBe('test@example.com');
    expect(user.id).toBeTruthy();
    expect(user.createdAt).toBeTruthy();
    expect(user.updatedAt).toBeTruthy();
  });

  it('should get user by id', async () => {
    const created = await service.createUser({
      name: 'Test User',
      email: 'test@example.com'
    });

    const found = await service.getUserById(created.id);
    expect(found).toBeTruthy();
    expect(found?.id).toBe(created.id);
    expect(found?.name).toBe('Test User');
  });

  it('should update user', async () => {
    const created = await service.createUser({
      name: 'Test User',
      email: 'test@example.com'
    });

    // Small delay to ensure timestamp changes
    await new Promise(resolve => setTimeout(resolve, 10));

    const updated = await service.updateUser(created.id, {
      name: 'Updated User'
    });

    expect(updated).toBeTruthy();
    expect(updated?.name).toBe('Updated User');
    expect(updated?.email).toBe('test@example.com');
    expect(updated?.updatedAt).toBeGreaterThanOrEqual(created.updatedAt); // Ensure updatedAt is newer
    expect(updated?.createdAt).toBe(created.createdAt); // createdAt should remain the same
  });

  it('should delete user', async () => {
    const created = await service.createUser({
      name: 'Test User',
      email: 'test@example.com'
    });

    const deleted = await service.deleteUser(created.id);
    expect(deleted).toBe(true);

    const found = await service.getUserById(created.id);
    expect(found).toBeNull();
  });

  it('should search users by email', async () => {
    await service.createUser({
      name: 'User 1',
      email: 'user1@example.com'
    });

    await service.createUser({
      name: 'User 2',
      email: 'user2@test.com'
    });

    const results = await service.searchByEmail('example');
    expect(results.length).toBe(1);
    expect(results[0].email).toContain('example');
  });

  it('should return null when getting non-existent user by id', async () => {
    const found = await service.getUserById('non-existent-id');
    expect(found).toBeNull();
  });

  it('should return null when updating non-existent user', async () => {
    const updated = await service.updateUser('non-existent-id', {
      name: 'Updated Name'
    });
    expect(updated).toBeNull();
  });

  it('should return false when deleting non-existent user', async () => {
    const deleted = await service.deleteUser('non-existent-id');
    expect(deleted).toBe(false);
  });

  it('should update user email', async () => {
    const created = await service.createUser({
      name: 'Test User',
      email: 'test@example.com'
    });

    await new Promise(resolve => setTimeout(resolve, 10));

    const updated = await service.updateUser(created.id, {
      email: 'newemail@example.com'
    });

    expect(updated).toBeTruthy();
    expect(updated?.email).toBe('newemail@example.com');
    expect(updated?.name).toBe('Test User');
    expect(updated?.updatedAt).toBeGreaterThan(created.updatedAt);
  });

  it('should update multiple user fields at once', async () => {
    const created = await service.createUser({
      name: 'Test User',
      email: 'test@example.com'
    });

    await new Promise(resolve => setTimeout(resolve, 10));

    const updated = await service.updateUser(created.id, {
      name: 'New Name',
      email: 'new@example.com'
    });

    expect(updated).toBeTruthy();
    expect(updated?.name).toBe('New Name');
    expect(updated?.email).toBe('new@example.com');
  });

  it('should get users sorted by date', async () => {
    const user1 = await service.createUser({
      name: 'User 1',
      email: 'user1@example.com'
    });

    await new Promise(resolve => setTimeout(resolve, 10));

    const user2 = await service.createUser({
      name: 'User 2',
      email: 'user2@example.com'
    });

    await new Promise(resolve => setTimeout(resolve, 10));

    const user3 = await service.createUser({
      name: 'User 3',
      email: 'user3@example.com'
    });

    const sorted = await service.getUsersSortedByDate();
    expect(sorted.length).toBe(3);
    expect(sorted[0].id).toBe(user3.id); // Most recent first
    expect(sorted[1].id).toBe(user2.id);
    expect(sorted[2].id).toBe(user1.id);
  });

  it('should return empty array when searching with no matches', async () => {
    await service.createUser({
      name: 'User 1',
      email: 'user1@example.com'
    });

    const results = await service.searchByEmail('nomatch');
    expect(results.length).toBe(0);
  });

  it('should return empty array when getting sorted users from empty database', async () => {
    const sorted = await service.getUsersSortedByDate();
    expect(sorted.length).toBe(0);
  });

  it('should generate unique user IDs', async () => {
    const user1 = await service.createUser({
      name: 'User 1',
      email: 'user1@example.com'
    });

    const user2 = await service.createUser({
      name: 'User 2',
      email: 'user2@example.com'
    });

    expect(user1.id).not.toBe(user2.id);
    expect(user1.id).toContain('user_');
    expect(user2.id).toContain('user_');
  });

  it('should get all users as observable', (done) => {
    service.createUser({
      name: 'User 1',
      email: 'user1@example.com'
    }).then(() => {
      return service.createUser({
        name: 'User 2',
        email: 'user2@example.com'
      });
    }).then(() => {
      service.getAllUsers$().subscribe((users) => {
        expect(users.length).toBeGreaterThanOrEqual(2);
        expect(users.some(u => u.name === 'User 1')).toBeTruthy();
        expect(users.some(u => u.name === 'User 2')).toBeTruthy();
        done();
      });
    });
  });

  it('should create users with correct timestamp format', async () => {
    const beforeCreate = Date.now();
    const user = await service.createUser({
      name: 'Test User',
      email: 'test@example.com'
    });
    const afterCreate = Date.now();

    expect(user.createdAt).toBeGreaterThanOrEqual(beforeCreate);
    expect(user.createdAt).toBeLessThanOrEqual(afterCreate);
    expect(user.updatedAt).toBe(user.createdAt);
  });

  it('should maintain createdAt timestamp during updates', async () => {
    const user = await service.createUser({
      name: 'Test User',
      email: 'test@example.com'
    });

    const originalCreatedAt = user.createdAt;

    await new Promise(resolve => setTimeout(resolve, 10));

    const updated = await service.updateUser(user.id, {
      name: 'Updated User'
    });

    expect(updated?.createdAt).toBe(originalCreatedAt);
  });
});
