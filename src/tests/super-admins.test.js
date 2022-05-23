import request from 'supertest';
import app from '../app';
import SuperAdmins from '../models/Super-Admins';
import superadminSeed from '../seeds/super-admins';

beforeAll(async () => {
  await SuperAdmins.collection.insertMany(superadminSeed);
});

describe('Get the super admin list', () => {
  test('Response should return a 200 status', async () => {
    const response = await request(app).get('/api/super-admins').send();
    expect(response.status).toBe(200);
  });

  test('Response should return false error', async () => {
    const response = await request(app).get('/api/super-admins').send();
    expect(response.error).toBe(false);
  });

  test('Response should return at least one super admin', async () => {
    const response = await request(app).get('/api/super-admins').send();
    expect(response.body.data.length).toBeGreaterThan(0);
  });

  test('Response should return a 404 status', async () => {
    const response = await request(app).get('/superadmins').send();
    expect(response.status).toBe(404);
  });

  test('Response should return true error', async () => {
    const response = await request(app).get('/super-admins').send();
    expect(response.error).toBeTruthy();
  });

  test('Response should return a message', async () => {
    const response = await request(app).get('/super-admins').send();
    expect(response.message).not.toBeNull();
  });

  test('Response should return data undefined', async () => {
    const response = await request(app).get('/super-admins').send();
    expect(response.data).toBeUndefined();
  });
});
