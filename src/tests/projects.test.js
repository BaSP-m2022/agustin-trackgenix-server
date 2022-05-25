import request from 'supertest';
import app from '../app';
import Projects from '../models/Projects';
import Employees from '../models/Employees';
import projectsSeed from '../seeds/projects';
import employeesSeed from '../seeds/employees';

beforeAll(async () => {
  await Projects.collection.insertMany(projectsSeed);
  await Employees.collection.insertMany(employeesSeed);
});

const projectId = '628af068c5554a93f700e8be';

describe('GET /projects', () => {
  test('Response should return a 200 status', async () => {
    const response = await request(app).get('/api/projects').send();
    expect(response.status).toBe(200);
  });

  test('Response should return a 404 status', async () => {
    const response = await request(app).get('/api').send();
    expect(response.status).toBe(404);
  });

  test('Response should return false error', async () => {
    const response = await request(app).get('/api/projects').send();
    expect(response.error).toBe(false);
  });

  test('Response should return a correct message', async () => {
    const response = await request(app).get('/api/projects').send();
    expect(response.body.message).toEqual('success');
  });

  test('Response should return valid name', async () => {
    const response = await request(app).get('/api/projects').send();
    response.body.data.forEach((project) => {
      expect(project.name.length).toBeGreaterThan(3);
    });
  });

  test('Response should return valid name', async () => {
    const response = await request(app).get('/api/projects').send();
    response.body.data.forEach((project) => {
      expect(project.description.length).toBeGreaterThan(3);
    });
  });

  test('Response should return status false', async () => {
    const response = await request(app).get('/api/projects').send();
    response.body.data.forEach((project) => {
      expect(project.status).toBe(false);
    });
  });

  test('Response should return valid client', async () => {
    const response = await request(app).get('/api/projects').send();
    response.body.data.forEach((project) => {
      expect(project.client.length).toBeGreaterThan(3);
    });
  });

  test('Response should return valid dev rate', async () => {
    const response = await request(app).get('/api/projects').send();
    response.body.data.forEach((project) => {
      expect(project.rates.dev).not.toBeNaN();
    });
  });

  test('Response should return valid pm rate', async () => {
    const response = await request(app).get('/api/projects').send();
    response.body.data.forEach((project) => {
      expect(project.rates.pm).not.toBeNaN();
    });
  });

  test('Response should return valid qa rate', async () => {
    const response = await request(app).get('/api/projects').send();
    response.body.data.forEach((project) => {
      expect(project.rates.qa).not.toBeNaN();
    });
  });

  test('Response should return at least project', async () => {
    const response = await request(app).get('/api/projects').send();
    expect(response.body.data.length).toBeGreaterThan(0);
  });
});

describe('GET /projects/:id', () => {
  test('Response should return a 200 status', async () => {
    const response = await request(app).get(`/api/projects/${projectId}`).send();
    expect(response.status).toBe(200);
  });

  test('Response should return valid dev rate', async () => {
    const response = await request(app).get(`/api/projects/${projectId}`).send();
    expect(response.body.data.rates.dev).not.toBeNaN();
  });

  test('Response should return valid pm rate', async () => {
    const response = await request(app).get(`/api/projects/${projectId}`).send();
    expect(response.body.data.rates.pm).not.toBeNaN();
  });

  test('Response should return valid qa rate', async () => {
    const response = await request(app).get(`/api/projects/${projectId}`).send();
    expect(response.body.data.rates.qa).not.toBeNaN();
  });
});

describe('PUT /projects/:id', () => {
  test('Response should return a 200 status', async () => {
    const response = await request(app).put(`/api/projects/${projectId}`).send({
      name: 'Project New Example',
      description: 'This text is an another example for the task 10',
      status: true,
      client: 'Nantendo',
      employees: [
        '62898d14882f8759987f5a37',
      ],
      rates: {
        dev: 28,
        pm: 55,
        qa: 42,
      },
    });
    expect(response.status).toBe(200);
  });

  test('Response should return a 400 status', async () => {
    const response = await request(app).put('/api/projects/asdasdad').send();
    expect(response.status).toBe(400);
  });

  test('Response should return a 404 status', async () => {
    const response = await request(app).put('/api/projects/').send();
    expect(response.status).toBe(404);
  });

  test('Response should return a not empty name', async () => {
    const response = await request(app).put(`/api/projects/${projectId}`).send({
      name: 'Project New Example',
      description: 'This text is an another example for the task 10',
      status: true,
      client: 'Nantendo',
      employees: [
        '62898d14882f8759987f5a37',
      ],
      rates: {
        dev: 28,
        pm: 55,
        qa: 42,
      },
    });
    expect(response.body.data.name.length).toBeGreaterThan(0);
  });

  test('Response should return a not empty description', async () => {
    const response = await request(app).put(`/api/projects/${projectId}`).send({
      name: 'Project New Example',
      description: 'This text is an another example for the task 10',
      status: false,
      client: 'Nantendo',
      employees: [
        '62898d14882f8759987f5a37',
      ],
      rates: {
        dev: 28,
        pm: 55,
        qa: 42,
      },
    });
    expect(response.body.data.description.length).toBeGreaterThan(0);
  });

  test('Response should return a not empty client', async () => {
    const response = await request(app).put(`/api/projects/${projectId}`).send({
      name: 'Project New Example',
      description: 'This text is an another example for the task 10',
      status: false,
      client: 'Nantendo',
      employees: [
        '62898d14882f8759987f5a37',
      ],
      rates: {
        dev: 28,
        pm: 55,
        qa: 42,
      },
    });
    expect(response.body.data.client.length).toBeGreaterThan(0);
  });

  test('Response should return a not empty employees', async () => {
    const response = await request(app).put(`/api/projects/${projectId}`).send({
      name: 'Project New Example',
      description: 'This text is an another example for the task 10',
      status: false,
      client: 'Nantendo',
      employees: [
        '62898d14882f8759987f5a37',
      ],
      rates: {
        dev: 28,
        pm: 55,
        qa: 42,
      },
    });
    expect(response.body.data.employees.length).toBeGreaterThan(0);
  });

  test('Response should return a not empty rates', async () => {
    const response = await request(app).put(`/api/projects/${projectId}`).send({
      name: 'Project New Example',
      description: 'This text is an another example for the task 10',
      status: false,
      client: 'Nantendo',
      employees: [
        '62898d14882f8759987f5a37',
      ],
      rates: {
        dev: 28,
        pm: 55,
        qa: 42,
      },
    });
    expect(response.body.data.rates).not.toBeNull();
  });
});
