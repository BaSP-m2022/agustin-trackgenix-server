import request from 'supertest';
import Admins from '../models/Admins';
import adminsSeed from '../seeds/admins';
import app from '../app';

beforeAll(async () => {
  await Admins.collection.insertMany(adminsSeed);
});

let newAdmin;
let idAdmin;
let newBody;

describe('GET /admins', () => {
  describe('when the user wants the full list of admins', () => {
    test('response should return a 200 status', async () => {
      const response = await request(app).get('/api/admins').send();
      expect(response.status).toBe(200);
    });
    test('response should return error false', async () => {
      const response = await request(app).get('/api/admins').send();
      expect(response.body.error).toBeFalsy();
    });
    test('response should return success messagge', async () => {
      const response = await request(app).get('/api/admins').send();
      expect(response.body.message).toEqual('success');
    });
    test('response should return 404 when path is wrong', async () => {
      const response = await request(app).get('/admins').send();
      expect(response.status).toBe(404);
    });
    test('response should return at least one admin', async () => {
      const response = await request(app).get('/api/admins').send();
      expect(response.body.data.length).toBeGreaterThan(0);
    });
  });
});

describe('POST /admins', () => {
  newAdmin = {
    name: 'gina',
    lastName: 'schp',
    email: 'gina@gmail.com',
    password: 'test123',
    status: true,
  };
  test('response should return status 201', async () => {
    const response = await request(app).post('/api/admins').send(newAdmin);
    expect(response.status).toBe(201);
    // eslint-disable-next-line no-underscore-dangle
    idAdmin = response.body.data._id;
  });
  test('response should return status 400', async () => {
    const response = await request(app).post('/api/admins').send();
    expect(response.status).toBe(400);
  });
});
describe('PUT /admins/:id', () => {
  newBody = {
    name: 'cori',
  };
  test('response should be a 200 status', async () => {
    const response = await request(app).put(`/api/admins/${idAdmin}`).send(newBody);
    expect(response.status).toBe(200);
  });
  test('response should return error false', async () => {
    const response = await request(app).put(`/api/admins/${idAdmin}`).send(newBody);
    expect(response.body.error).toBeFalsy();
  });
  test('response should return updated message', async () => {
    const response = await request(app).put(`/api/admins/${idAdmin}`).send(newBody);
    expect(response.body.message).toEqual('Admin updated successfully');
  });
  describe('when ID entered is not found', () => {
    test('response should return 404 error', async () => {
      const response = await request(app).put('/api/admins/6282a72e4fc3cd510123ee20').send(newBody);
      expect(response.status).toBe(404);
    });
  });
});

describe('GET /admins/:id', () => {
  describe('when the admin with id entered is found', () => {
    test('response should return a 200 status', async () => {
      const response = await request(app).get(`/api/admins/${idAdmin}`).send();
      expect(response.status).toBe(200);
    });
    test('response should return false error', async () => {
      const response = await request(app).get(`/api/admins/${idAdmin}`).send();
      expect(response.body.error).toBeFalsy();
    });
    test('response should return a successful message', async () => {
      const response = await request(app).get(`/api/admins/${idAdmin}`).send();
      expect(response.body.message).toEqual('success');
    });
    test('response should return at least one admin', async () => {
      const response = await request(app).get(`/api/admins/${idAdmin}`).send();
      expect(response.body.data).toBeDefined();
    });
  });
  describe('when the admin with id entered is not found', () => {
    test('response should return a 404 status', async () => {
      const response = await request(app).get('/api/admins/6282a72e4fc3cd510123ee20').send();
      expect(response.status).toBe(404);
    });
    test('response should return true error', async () => {
      const response = await request(app).get('/api/admins/6282a72e4fc3cd510123ee20').send();
      expect(response.body.error).toBeTruthy();
    });
    test('response should return an undefined data', async () => {
      const response = await request(app).get('/api/admins/6282a72e4fc3cd510123ee20').send();
      expect(response.body.data).toBeUndefined();
    });
  });
});
describe('DELETE /delete/:id', () => {
  test('response should return a 204 satus', async () => {
    const response = await request(app).delete(`/api/admins/${idAdmin}`).send();
    expect(response.status).toBe(204);
    expect(response.body.error).toBeFalsy();
  });
  test('response should return a 400 satus', async () => {
    const response = await request(app).delete('/api/admins/6282a72e4fc3cd510123ee20').send();
    expect(response.status).toBe(404);
  });
});
