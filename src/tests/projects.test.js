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

let projectId;

describe('POST /projects', () => {
  test('Should create an project', async () => {
    const response = await request(app).post('/api/projects/').send({
      name: 'Project Example',
      description: 'This text is an example for the task 10',
      status: 'false',
      client: 'Monsters, Inc.',
      employees: [
        '62898d14882f8759987f5a37',
      ],
      rates: {
        dev: 27,
        pm: 65,
        qa: 22,
      },
    });
    expect(response.status).toBe(201);
    // eslint-disable-next-line no-underscore-dangle
    projectId = response.body.data._id;
  });

  test('Response should return a error false', async () => {
    const response = await request(app).post('/api/projects').send({
      name: 'Project Example',
      description: 'This text is an example for the task 10',
      status: 'false',
      client: 'Monsters, Inc.',
      employees: [
        '62898d14882f8759987f5a37',
      ],
      rates: {
        dev: 27,
        pm: 65,
        qa: 22,
      },
    });
    expect(response.body.error).toBe(false);
  });

  test('Response should return a not undefined data', async () => {
    const response = await request(app).post('/api/projects').send({
      name: 'Project Example',
      description: 'This text is an example for the task 10',
      status: 'false',
      client: 'Monsters, Inc.',
      employees: [
        '62898d14882f8759987f5a37',
      ],
      rates: {
        dev: 27,
        pm: 65,
        qa: 22,
      },
    });
    expect(response.body.data).not.toBeUndefined();
  });

  test('Response should return a correct message', async () => {
    const response = await request(app).post('/api/projects').send({
      name: 'Project Example',
      description: 'This text is an example for the task 10',
      status: 'false',
      client: 'Monsters, Inc.',
      employees: [
        '62898d14882f8759987f5a37',
      ],
      rates: {
        dev: 27,
        pm: 65,
        qa: 22,
      },
    });
    expect(response.body.message).toEqual('Project created');
  });
});

describe('DELETE /projects/:id', () => {
  test('Response should return a status 400', async () => {
    const response = await request(app).delete('/api/projects/huiibfsk5468').send();
    expect(response.status).toBe(400);
  });

  test('Response should return a status 404', async () => {
    const response = await request(app).delete('/api/employe/62000f17882f9869987f5a37').send();
    expect(response.status).toBe(404);
  });

  test('Response should return a status 404', async () => {
    const response = await request(app).delete('/api/projects/63368d18482f9756687f5b41').send();
    expect(response.status).toBe(404);
  });

  test('Response should return a error true', async () => {
    const response = await request(app).delete('/api/projects/63368d18482f9756687f5b41').send();
    expect(response.body.error).toBe(true);
  });

  test('Response should return a data undefined', async () => {
    const response = await request(app).delete('/api/projects/63368d18482f9756687f5b41').send();
    expect(response.body.data).toBeUndefined();
  });

  test('Response should return a non empty message', async () => {
    const response = await request(app).delete(`/api/projects/${projectId}`).send();
    expect(response.body.message).toEqual('The project was successfully deleted');
  });

  test('Response should return a status 204', async () => {
    const response = await request(app).delete(`/api/projects/${projectId}`).send();
    expect(response.status).toBe(204);
    expect(response.body.error).toBe(false);
    expect(response.body.data).not.toBeUndefined();
    expect(response.body.message).toEqual('The project was successfully deleted');
  });
});
