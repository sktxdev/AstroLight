import { TestBed } from '@angular/core/testing';
import { DatabaseService } from './database.service';

describe('DatabaseService', () => {
  let service: DatabaseService;

  beforeEach(async () => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatabaseService);
  });

  afterEach(async () => {
    try {
      await service.destroy();
    } catch (e) {
      console.error('Error destroying database:', e);
    }
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize database', async () => {
    const db = await service.getDatabase();
    expect(db).toBeTruthy();
    expect(db.name).toBe('angulardashboard');
  });

  it('should return same database instance on multiple calls', async () => {
    const db1 = await service.getDatabase();
    const db2 = await service.getDatabase();
    expect(db1).toBe(db2);
  });

  it('should have users collection', async () => {
    const db = await service.getDatabase();
    expect(db.users).toBeTruthy();
  });

  it('should destroy database', async () => {
    const db = await service.getDatabase();
    expect(db).toBeTruthy();

    await service.destroy();

    // Should create new instance after destroy
    const newDb = await service.getDatabase();
    expect(newDb).toBeTruthy();
    expect(newDb).not.toBe(db);
  });

  it('should handle multiple concurrent initialization calls', async () => {
    const promises = [
      service.getDatabase(),
      service.getDatabase(),
      service.getDatabase()
    ];

    const results = await Promise.all(promises);
    expect(results[0]).toBe(results[1]);
    expect(results[1]).toBe(results[2]);
  });

  it('should handle destroy when database is null', async () => {
    await expectAsync(service.destroy()).toBeResolved();
  });

  it('should have correct user schema configuration', async () => {
    const db = await service.getDatabase();
    const collection = db.users;

    expect(collection.schema.version).toBe(0);
    expect(collection.schema.primaryPath).toBe('id');
    expect(collection.schema.jsonSchema).toBeDefined();
    expect(collection.schema.jsonSchema.type).toBe('object');
  });

  it('should have correct indexes configured', async () => {
    const db = await service.getDatabase();
    const collection = db.users;

    const schema = (collection.schema as any).jsonSchema;
    expect(schema.indexes).toBeDefined();
    expect(Array.isArray(schema.indexes)).toBe(true);
  });
});
