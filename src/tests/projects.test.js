import request from 'supertest';
import app from '../app';
import Projects from '../models/Projects';
import projectsSeed from '../seeds/projects';

beforeAll(async () => {
  await Projects.collection.insertMany(projectsSeed);
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
});

describe('POST /projects', () => {
  test('Should create an project', async () => {
    const response = await request(app).post('/api/projects/').send({
      name: 'Project Example',
      description: 'This text is an example for the task 10',
      status: 'false',
      client: 'Monsters, Inc.',
      employees: [{
        _id: '628c0660caaa79d393d6d8a6',
      }],
      rates: {
        dev: 27,
        pm: 65,
        qa: 22,
      },
    });
    expect(response.status).toBe(201);
  });
});

describe('PUT /projects/:id', () => {
  test('Response should return a 200 status', async () => {
    const response = await request(app).put(`/api/projects/${projectId}`).send({
      name: 'Project New Example',
      description: 'This text is an another example for the task 10',
      status: 'false',
      client: 'Nantendo',
      employees: [{
        _id: '628c0660caaa79d393d6d8a6',
      }],
      rates: {
        dev: 27,
        pm: 65,
        qa: 22,
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
});
