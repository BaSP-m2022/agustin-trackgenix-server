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

describe('Get super admin by id', () => {
  test('Response should return a 200 status', async () => {
    const response = await request(app).get('/api/super-admins/6283f334fcd4fe8e83f960d4').send();
    expect(response.status).toBe(200);
  });

  test('Response should return a false error', async () => {
    const response = await request(app).get('/api/super-admins/6283f334fcd4fe8e83f960d4').send();
    expect(response.error).toBeFalsy();
  });

  test('Response should return a super admin', async () => {
    const response = await request(app).get('/api/super-admins/6283f334fcd4fe8e83f960d4').send();
    expect(response.body.data).not.toBeNull();
  });

  test('Response should return a message', async () => {
    const response = await request(app).get('/api/super-admins/6283f334fcd4fe8e83f960d4').send();
    expect(response.message).not.toBeNull();
  });

  test('Response should return 400 status', async () => {
    const response = await request(app).get('/api/super-admins/:id').send();
    expect(response.status).toBe(400);
  });

  test('Response should return a true error', async () => {
    const response = await request(app).get('/api/super-admins/:id').send();
    expect(response.error).toBeTruthy();
  });

  test('Response should return a error message', async () => {
    const response = await request(app).get('/api/super-admins/:id').send();
    expect(response.message).not.toBeNull();
  });

  test('Response should return a 404 status', async () => {
    const response = await request(app).get('/api/super-admins/6283f334fcd4fe8e83f960d3').send();
    expect(response.status).toBe(404);
  });

  test('Response should return true error', async () => {
    const response = await request(app).get('/api/super-admins/6283f334fcd4fe8e83f960d2').send();
    expect(response.error).toBeTruthy();
  });

  test('Response should return a error message', async () => {
    const response = await request(app).get('/api/super-admins/6283f334fcd4fe8e83f960d1').send();
    expect(response.message).not.toBeNull();
  });
});
