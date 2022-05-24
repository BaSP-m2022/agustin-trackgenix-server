import request from 'supertest';
import app from '../app';
import Employees from '../models/Employees';
import Project from '../models/Projects';
import employeesSeed from '../seeds/employees';
import projectsSeed from '../seeds/projects';

beforeAll(async () => {
  await Employees.collection.insertMany(employeesSeed);
  await Project.collection.insertMany(projectsSeed);
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

  test('Response should return a correct message', async () => {
    const response = await request(app).get('/api/employees').send();
    expect(response.body.message).toEqual('Employees listed successfully');
  });

  test('Response should return a non empty data', async () => {
    const response = await request(app).get('/api/employees').send();
    expect(response.body.data.length).toBeGreaterThan(0);
  });

  test('Response should return 12 keys in data', async () => {
    const response = await request(app).get('/api/employees').send();
    expect(Object.keys(response.body.data[0]).length).toEqual(12);
  });

  test('Response should return valid names', async () => {
    const response = await request(app).get('/api/employees').send();
    response.body.data.forEach((employee) => {
      expect(employee.name.length).toBeGreaterThan(3);
    });
  });

  test('Response should return valid lastName', async () => {
    const response = await request(app).get('/api/employees').send();
    response.body.data.forEach((employee) => {
      expect(employee.lastName.length).toBeGreaterThan(3);
    });
  });

  test('Response should return valid email', async () => {
    const response = await request(app).get('/api/employees').send();
    response.body.data.forEach((employee) => {
      expect(employee.email.length).toBeGreaterThan(6);
    });
  });

  test('Response should return valid password', async () => {
    const response = await request(app).get('/api/employees').send();
    response.body.data.forEach((employee) => {
      expect(employee.password.length).toBeGreaterThan(6);
    });
  });

  test('Response should return valid dni', async () => {
    const response = await request(app).get('/api/employees').send();
    response.body.data.forEach((employee) => {
      expect(employee.dni).toBeGreaterThan(1000000);
      expect(employee.dni).toBeLessThan(99999999);
    });
  });

  test('Response should return valid address', async () => {
    const response = await request(app).get('/api/employees').send();
    response.body.data.forEach((employee) => {
      expect(employee.address.length).toBeGreaterThan(3);
    });
  });

  test('Response should return valid city', async () => {
    const response = await request(app).get('/api/employees').send();
    response.body.data.forEach((employee) => {
      expect(employee.city.length).toBeGreaterThan(3);
    });
  });

  test('Response should return valid zip', async () => {
    const response = await request(app).get('/api/employees').send();
    response.body.data.forEach((employee) => {
      expect(employee.zip).toBeGreaterThan(999);
      expect(employee.zip).toBeLessThan(10000);
    });
  });

  test('Response should return valid role', async () => {
    const response = await request(app).get('/api/employees').send();
    response.body.data.forEach((employee) => {
      expect(typeof employee.status === 'boolean').toBeTruthy();
    });
  });

  test('Response should return valid projects', async () => {
    const response = await request(app).get('/api/employees').send();
    response.body.data.forEach((employee) => {
      expect(Object.keys(employee.projects[0]).length).toEqual(7);
    });
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
        '628af068c5554a93f700e8be',
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
        '628af068c5554a93f700e8be',
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
        '628af068c5554a93f700e8be',
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
        '628af068c5554a93f700e8be',
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
        '628af068c5554a93f700e8be',
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
