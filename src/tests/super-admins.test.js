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

describe('Create a super admin', () => {
  test('A super admin should be created', async () => {
    const response = await request(app).post('/api/super-admins').send({
      firstName: 'Anakin',
      lastName: 'Skywalker',
      email: 'chosen.one@gmail.com',
      password: 'cyborg4life',
      status: true,
    });
    expect(response.status).toBe(201);
  });

  test('Response should return a false error', async () => {
    const response = await request(app).post('/api/super-admins').send({
      firstName: 'Anakin',
      lastName: 'Skywalker',
      email: 'chosen.one@gmail.com',
      password: 'cyborg4life',
      status: true,
    });
    expect(response.error).toBeFalsy();
  });

  test('The message should indicate the creation of a super admin', async () => {
    const response = await request(app).post('/api/super-admins').send({
      firstName: 'Anakin',
      lastName: 'Skywalker',
      email: 'chosen.one@gmail.com',
      password: 'cyborg4life',
      status: true,
    });
    expect(response.body.message).toEqual('A new Super Admin has been created!');
  });

  test('Response should return a 400 status', async () => {
    const response = await request(app).post('/api/super-admins').send();
    expect(response.status).toBe(400);
  });

  test('Response should return a true error', async () => {
    const response = await request(app).post('/api/super-admins').send();
    expect(response.error).toBeTruthy();
  });

  test('The message should indicate there was an error', async () => {
    const response = await request(app).post('/api/super-admins').send();
    expect(response.body.message).toEqual('There was an error during the request validation:');
  });

  test('Super admin should not be created without first name', async () => {
    const response = await request(app).post('/api/super-admins').send({
      lastName: 'Skywalker',
      email: 'chosen.one@gmail.com',
      password: 'cyborg4life',
      status: true,
    });
    expect(response.status).toBe(400);
  });

  test('Super admin should not be created without last name', async () => {
    const response = await request(app).post('/api/super-admins').send({
      firstName: 'Anakin',
      email: 'chosen.one@gmail.com',
      password: 'cyborg4life',
      status: true,
    });
    expect(response.status).toBe(400);
  });

  test('Super admin should not be created without email', async () => {
    const response = await request(app).post('/api/super-admins').send({
      firstName: 'Anakin',
      lastName: 'Skywalker',
      password: 'cyborg4life',
      status: true,
    });
    expect(response.status).toBe(400);
  });

  test('Super admin should not be created without password', async () => {
    const response = await request(app).post('/api/super-admins').send({
      firstName: 'Anakin',
      lastName: 'Skywalker',
      email: 'chosen.one@gmail.com',
      status: true,
    });
    expect(response.status).toBe(400);
  });

  test('Super admin should not be created without status', async () => {
    const response = await request(app).post('/api/super-admins').send({
      firstName: 'Anakin',
      lastName: 'Skywalker',
      email: 'chosen.one@gmail.com',
      password: 'cyborg4life',
    });
    expect(response.status).toBe(400);
  });

  test('Wrong path should return a 404 status', async () => {
    const response = await request(app).post('/super-admins').send({
      firstName: 'Anakin',
      lastName: 'Skywalker',
      email: 'chosen.one@gmail.com',
      password: 'cyborg4life',
      status: true,
    });
    expect(response.status).toBe(404);
  });

  test('First name should be valid', async () => {
    const response = await request(app).put('/api/super-admins/6283f334fcd4fe8e83f960d4').send({
      firstName: 'Anakin',
      lastName: 'Skywalker',
      email: 'chosen.one@gmail.com',
      password: 'cyborg4life',
      status: true,
    });
    expect(response.body.data.firstName.length).toBeGreaterThan(2);
  });

  test('Last name should be valid', async () => {
    const response = await request(app).put('/api/super-admins/6283f334fcd4fe8e83f960d4').send({
      firstName: 'Anakin',
      lastName: 'Skywalker',
      email: 'chosen.one@gmail.com',
      password: 'cyborg4life',
      status: true,
    });
    expect(response.body.data.lastName.length).toBeGreaterThan(2);
  });

  test('Email should be valid', async () => {
    const response = await request(app).put('/api/super-admins/6283f334fcd4fe8e83f960d4').send({
      firstName: 'Anakin',
      lastName: 'Skywalker',
      email: 'chosen.one@gmail.com',
      password: 'cyborg4life',
      status: true,
    });
    expect(response.body.data.email).toMatch(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.([a-zA-Z]{2,4})+$/);
  });

  test('Password should be valid', async () => {
    const response = await request(app).put('/api/super-admins/6283f334fcd4fe8e83f960d4').send({
      firstName: 'Anakin',
      lastName: 'Skywalker',
      email: 'chosen.one@gmail.com',
      password: 'cyborg4life',
      status: true,
    });
    expect(response.body.data.password.length).toBeGreaterThan(8);
  });

  test('Super admin status should be valid', async () => {
    const response = await request(app).put('/api/super-admins/6283f334fcd4fe8e83f960d4').send({
      firstName: 'Anakin',
      lastName: 'Skywalker',
      email: 'chosen.one@gmail.com',
      password: 'cyborg4life',
      status: true,
    });
    expect(response.body.data.status).toBeTruthy();
  });
});

describe('Update a super admin', () => {
  test('If the name is updated, response should return a 200 status', async () => {
    const response = await request(app).put('/api/super-admins/6283f334fcd4fe8e83f960d4').send({
      firstName: 'Anaki',
    });
    expect(response.status).toBe(200);
  });

  test('If the last name is updated, response should return a 200 status', async () => {
    const response = await request(app).put('/api/super-admins/6283f334fcd4fe8e83f960d4').send({
      lastName: 'Skywaker',
    });
    expect(response.status).toBe(200);
  });

  test('If the email is updated, response should return a 200 status', async () => {
    const response = await request(app).put('/api/super-admins/6283f334fcd4fe8e83f960d4').send({
      email: 'chosenone@gmail.com',
    });
    expect(response.status).toBe(200);
  });

  test('If the password is updated, response should return a 200 status', async () => {
    const response = await request(app).put('/api/super-admins/6283f334fcd4fe8e83f960d4').send({
      password: 'cyborg4liife',
    });
    expect(response.status).toBe(200);
  });

  test('If the status is updated, response should return a 200 status', async () => {
    const response = await request(app).put('/api/super-admins/6283f334fcd4fe8e83f960d4').send({
      status: false,
    });
    expect(response.status).toBe(200);
  });

  test('Response should return a false error', async () => {
    const response = await request(app).put('/api/super-admins/6283f334fcd4fe8e83f960d4').send({
      firstName: 'Anaki',
    });
    expect(response.error).toBeFalsy();
  });

  test('The message should indicate the creation of a super admin', async () => {
    const response = await request(app).put('/api/super-admins/6283f334fcd4fe8e83f960d4').send({
      firstName: 'Anaki',
    });
    expect(response.body.message).toEqual('Super Admin succesfully updated!');
  });

  test('Wrong path should return a 404 status', async () => {
    const response = await request(app).put('/api/super-admins').send();
    expect(response.status).toBe(404);
  });

  test('If the first name is empty, response should return a 400 status', async () => {
    const response = await request(app).put('/api/super-admins/6283f334fcd4fe8e83f960d4').send({
      firstName: '',
    });
    expect(response.status).toBe(400);
  });

  test('If the last name is empty, response should return a 400 status', async () => {
    const response = await request(app).put('/api/super-admins/6283f334fcd4fe8e83f960d4').send({
      lastName: '',
    });
    expect(response.status).toBe(400);
  });

  test('If the email is empty, response should return a 400 status', async () => {
    const response = await request(app).put('/api/super-admins/6283f334fcd4fe8e83f960d4').send({
      email: '',
    });
    expect(response.status).toBe(400);
  });

  test('If the password is empty, response should return a 400 status', async () => {
    const response = await request(app).put('/api/super-admins/6283f334fcd4fe8e83f960d4').send({
      password: '',
    });
    expect(response.status).toBe(400);
  });

  test('If the status is empty, response should return a 400 status', async () => {
    const response = await request(app).put('/api/super-admins/6283f334fcd4fe8e83f960d4').send({
      status: '',
    });
    expect(response.status).toBe(400);
  });

  test('Response should return a true error', async () => {
    const response = await request(app).put('/api/super-admins/6283f334fcd4fe8e83f960d4').send({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      status: '',
    });
    expect(response.error).toBeTruthy();
  });

  test('Response should return an error message', async () => {
    const response = await request(app).put('/api/super-admins/6283f334fcd4fe8e83f960d4').send({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      status: '',
    });
    expect(response.body.message).not.toBeNull();
  });

  test('First name should be valid', async () => {
    const response = await request(app).put('/api/super-admins/6283f334fcd4fe8e83f960d4').send({
      firstName: 'Anakin',
      lastName: 'Skywalker',
      email: 'chosen.one@gmail.com',
      password: 'cyborg4life',
      status: false,
    });
    expect(response.body.data.firstName.length).toBeGreaterThan(2);
  });

  test('Last name should be valid', async () => {
    const response = await request(app).put('/api/super-admins/6283f334fcd4fe8e83f960d4').send({
      firstName: 'Anakin',
      lastName: 'Skywalker',
      email: 'chosen.one@gmail.com',
      password: 'cyborg4life',
      status: false,
    });
    expect(response.body.data.lastName.length).toBeGreaterThan(2);
  });

  test('Email should be valid', async () => {
    const response = await request(app).put('/api/super-admins/6283f334fcd4fe8e83f960d4').send({
      firstName: 'Anakin',
      lastName: 'Skywalker',
      email: 'chosen.one@gmail.com',
      password: 'cyborg4life',
      status: false,
    });
    expect(response.body.data.email).toMatch(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.([a-zA-Z]{2,4})+$/);
  });

  test('Password should be valid', async () => {
    const response = await request(app).put('/api/super-admins/6283f334fcd4fe8e83f960d4').send({
      firstName: 'Anakin',
      lastName: 'Skywalker',
      email: 'chosen.one@gmail.com',
      password: 'cyborg4life',
      status: false,
    });
    expect(response.body.data.password.length).toBeGreaterThan(8);
  });

  test('Super admin status should be valid', async () => {
    const response = await request(app).put('/api/super-admins/6283f334fcd4fe8e83f960d4').send({
      firstName: 'Anakin',
      lastName: 'Skywalker',
      email: 'chosen.one@gmail.com',
      password: 'cyborg4life',
      status: false,
    });
    expect(response.body.data.status).toBeFalsy();
  });
});

describe('Delete a super admin', () => {
  test('Response shloud return a 204 status', async () => {
    const response = await request(app).delete('/api/super-admins/6283f334fcd4fe8e83f960d4').send();
    expect(response.status).toBe(204);
  });

  test('Response shloud return a 404 status', async () => {
    const response = await request(app).delete('/api/super-admins/6283f334fcd4fe8e83f960d0').send();
    expect(response.status).toBe(404);
  });

  test('Message should indicate the id doesn´t exist', async () => {
    const response = await request(app).delete('/api/super-admins/6283f334fcd4fe8e83f960d0').send();
    expect(response.body.message).toEqual('There is no Super Admin with matching id: 6283f334fcd4fe8e83f960d0.');
  });

  test('Response shloud return a true error', async () => {
    const response = await request(app).delete('/api/super-admins/6283f334fcd4fe8e83f960d4').send();
    expect(response.error).toBeTruthy();
  });

  test('Response shloud return data undefined', async () => {
    const response = await request(app).delete('/api/super-admins/6283f334fcd4fe8e83f960d4').send();
    expect(response.data).toBeUndefined();
  });
});
