import request from 'supertest';
import Employees from '../models/Employees';
import employeesSeed from '../seeds/employees';
import app from '../app';

beforeAll(async () => {
  await Employees.collection.insertMany(employeesSeed);
});

let employeeId;

describe('Test Employees routes', () => {
  test('It should create a new employee', async () => {
    const response = await request(app).post('api/employees').send({
      name: 'Esteban',
      lastName: 'Frare',
      email: 'esteban.frare@radiumrocket.com',
      password: 'test123',
      dni: '38240915',
      address: 'Paraguay 2349',
      city: 'Rosario',
      zip: '2000',
      status: true,
      role: 'DEV',
      project: [
        {
          name: 'Test Project',
          description: 'This is a test project',
        },
      ],
    });
    console.log(response);
    expect(response.statusCode).toBe(201);
    expect(response.body.error).toBe(false);
    // eslint-disable-next-line no-underscore-dangle
    employeeId = response.body.data._id;
  });

  test('It should get the employee list', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
    expect(response.body.error).toBe(false);
  });

  test('It should delete a employee', async () => {
    const response = await request(app).delete(`/${employeeId}`);
    expect(response.statusCode).toBe(200);
    expect(response.body.error).toBe(false);
  });
});
