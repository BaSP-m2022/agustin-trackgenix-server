import request from 'supertest';
import app from '../app';
import Employees from '../models/Employees';
import employeesSeed from '../seeds/employees';

beforeAll(async () => {
  await Employees.collection.insertMany(employeesSeed);
});

describe('GET /employees', () => {
  test('Response should return a status 404', async () => {
    const response = await request(app).get('/api/employe').send();
    expect(response.status).toBe(404);
  });

  test('Response should return a status 200', async () => {
    const response = await request(app).get('/api/employees').send();
    expect(response.status).toBe(200);
  });

  test('Response should return a false error', async () => {
    const response = await request(app).get('/api/employees').send();
    expect(response.body.error).toBe(false);
  });

  test('Response should return a non empty data', async () => {
    const response = await request(app).get('/api/employees').send();
    expect(response.body.data.length).toBeGreaterThan(0);
  });

  test('Response should return a non empty message', async () => {
    const response = await request(app).get('/api/employees').send();
    expect(response.body.message.length).toBeGreaterThan(5);
  });
});

describe('GET BY ID /employees/:id', () => {
  test('With an incorrect id the response should return a status 400', async () => {
    const response = await request(app).get('/api/employees/asdf56165').send();
    expect(response.status).toBe(400);
  });

  test('With an incorrect route the response should return a status 404', async () => {
    const response = await request(app).get('/api/employe/62898d14882f8759987f5a37').send();
    expect(response.status).toBe(404);
  });

  test('With an nonexistent id the response should return a status 404', async () => {
    const response = await request(app).get('/api/employees/62898d14882f8759987f5b50').send();
    expect(response.status).toBe(404);
  });

  test('With an nonexistent id the response should return a error true', async () => {
    const response = await request(app).get('/api/employees/62898d14882f8759987f5b50').send();
    expect(response.body.error).toBe(true);
  });

  test('With an nonexistent id the response should return a data undefined', async () => {
    const response = await request(app).get('/api/employees/62898d14882f8759987f5b50').send();
    expect(response.body.data).toBeUndefined();
  });

  test('With an nonexistent id the response should return a non empty message', async () => {
    const response = await request(app).get('/api/employees/62898d14882f8759987f5b50').send();
    expect(response.body.message).toEqual('Id 62898d14882f8759987f5b50 does not exist');
  });

  test('With an correct id the response should return a status 200', async () => {
    const response = await request(app).get('/api/employees/62898d14882f8759987f5a37').send();
    expect(response.status).toBe(200);
  });

  test('With an correct id the response should return a error false', async () => {
    const response = await request(app).get('/api/employees/62898d14882f8759987f5a37').send();
    expect(response.body.error).toBe(false);
  });

  test('With an correct id the response should return a not undefined data', async () => {
    const response = await request(app).get('/api/employees/62898d14882f8759987f5a37').send();
    expect(response.body.data).not.toBeUndefined();
  });

  test('With an correct id the response should return a non empty message', async () => {
    const response = await request(app).get('/api/employees/62898d14882f8759987f5a37').send();
    expect(response.body.message).toEqual('success');
  });
});

let idEmployeeCreated;

describe('POST /employees', () => {
  test('With an correct user the response should return a status 201', async () => {
    const response = await request(app).post('/api/employees').send({
      name: 'Lucas',
      lastName: 'Prat',
      email: 'lucas@gmail.com',
      password: '12345asd',
      dni: 32862741,
      address: 'Salvat',
      city: 'Rosario',
      zip: 2000,
      status: true,
      role: 'PM',
      projects: [
        { _id: '6282835e7161c78df5f6acab' },
        { _id: '628283bb7161c78df5f6acb0' },
      ],
    });
    expect(response.status).toBe(201);
    // eslint-disable-next-line no-underscore-dangle
    idEmployeeCreated = response.body.data._id;
  });

  test('With an correct user the response should return a error false', async () => {
    const response = await request(app).post('/api/employees').send({
      name: 'Lucas',
      lastName: 'Prat',
      email: 'lucas@gmail.com',
      password: '12345asd',
      dni: 32862741,
      address: 'Salvat',
      city: 'Rosario',
      zip: 2000,
      status: true,
      role: 'PM',
      projects: [
        { _id: '6282835e7161c78df5f6acab' },
        { _id: '628283bb7161c78df5f6acb0' },
      ],
    });
    expect(response.body.error).toBe(false);
  });

  test('With an correct user the response should return a not undefined data', async () => {
    const response = await request(app).post('/api/employees').send({
      name: 'Lucas',
      lastName: 'Prat',
      email: 'lucas@gmail.com',
      password: '12345asd',
      dni: 32862741,
      address: 'Salvat',
      city: 'Rosario',
      zip: 2000,
      status: true,
      role: 'PM',
      projects: [
        { _id: '6282835e7161c78df5f6acab' },
        { _id: '628283bb7161c78df5f6acb0' },
      ],
    });
    expect(response.body.data).not.toBeUndefined();
  });

  test('With an correct user the response should return a correct message', async () => {
    const response = await request(app).post('/api/employees').send({
      name: 'Lucas',
      lastName: 'Prat',
      email: 'lucas@gmail.com',
      password: '12345asd',
      dni: 32862741,
      address: 'Salvat',
      city: 'Rosario',
      zip: 2000,
      status: true,
      role: 'PM',
      projects: [
        { _id: '6282835e7161c78df5f6acab' },
        { _id: '628283bb7161c78df5f6acb0' },
      ],
    });
    expect(response.body.message).toEqual('Employee created successfully');
  });

  test('name length min 3', async () => {
    const response = await request(app).post('/api/employees').send({
      name: 'Lucas',
      lastName: 'Prat',
      email: 'lucas@gmail.com',
      password: '12345asd',
      dni: 32862741,
      address: 'Salvat',
      city: 'Rosario',
      zip: 2000,
      status: true,
      role: 'PM',
      projects: [
        { _id: '6282835e7161c78df5f6acab' },
        { _id: '628283bb7161c78df5f6acb0' },
      ],
    });
    expect(response.body.data.name.length).toBeGreaterThan(3);
  });
});

// ----------DELETE----------
describe('DELETE /employees/:id', () => {
  test('With an incorrect id the response should return a status 400', async () => {
    const response = await request(app).delete('/api/employees/asdf56165').send();
    expect(response.status).toBe(400);
  });

  test('With an incorrect route the response should return a status 404', async () => {
    const response = await request(app).delete('/api/employe/62898d14882f8759987f5a37').send();
    expect(response.status).toBe(404);
  });

  test('With an nonexistent id the response should return a status 404', async () => {
    const response = await request(app).delete('/api/employees/62898d14882f8759987f5b50').send();
    expect(response.status).toBe(404);
  });

  test('With an nonexistent id the response should return a error true', async () => {
    const response = await request(app).delete('/api/employees/62898d14882f8759987f5b50').send();
    expect(response.body.error).toBe(true);
  });

  test('With an nonexistent id the response should return a data undefined', async () => {
    const response = await request(app).delete('/api/employees/62898d14882f8759987f5b50').send();
    expect(response.body.data).toBeUndefined();
  });

  test('With an nonexistent id the response should return a non empty message', async () => {
    const response = await request(app).delete('/api/employees/62898d14882f8759987f5b50').send();
    expect(response.body.message.length).toBeGreaterThan(5);
  });

  test('With an correct id the response should return a status 204', async () => {
    const response = await request(app).delete(`/api/employees/${idEmployeeCreated}`).send();
    expect(response.status).toBe(204);
  });
});
