import request from 'supertest';
import app from '../app';
import Projects from '../models/Projects';
import projectsSeed from '../seeds/projects';

beforeAll(async () => {
  await Projects.collection.insertMany(projectsSeed);
});

let projectId;

describe('POST /projects', () => {
  test('should create a project', async () => {
    const response = await request(app).post('/projects').send({
      name: 'Preparation',
      description: 'This is a project to prepare a surprise party',
      status: 'Activo',
      client: 'Trackgenix SA',
      employees: {
        name: 'Carlos',
        lastName: 'Moreyra',
        role: 'DEV',
      },
      rates: {
        dev: 5,
        pm: 2,
        qa: 4,
      },
    });
    expect(response.status).toBe(201);
    projectId = response.body.data.id;
  });

  test('message should indicate that the project was crated succesfully', async () => {
    const response = await request(app).post('/projects').send({
      name: 'Preparation',
      description: 'This is a project to prepare a surprise party',
      status: 'Activo',
      client: 'Trackgenix SA',
      employees: {
        name: 'Carlos',
        lastName: 'Moreyra',
        role: 'DEV',
      },
      rates: {
        dev: 5,
        pm: 2,
        qa: 4,
      },
    });
    expect(response.body.message).toEqual('Project created');
  });

  test('should not create a project', async () => {
    const response = await request(app).post('/projects').send();
    expect(response.status).toBe(400);
  });

  test('the name of the project should not be empty', async () => {
    const response = await request(app).post('/projects').send({
      name: 'Preparation',
      description: 'This is a project to prepare a surprise party',
      status: 'Activo',
      client: 'Trackgenix SA',
      employees: {
        name: 'Carlos',
        lastName: 'Moreyra',
        role: 'DEV',
      },
      rates: {
        dev: 5,
        pm: 2,
        qa: 4,
      },
    });
    expect(response.status).toBe(400);
  });

  test('the description of the project should not be empty', async () => {
    const response = await request(app).post('/projects').send({
      name: 'Preparation',
      description: null,
      status: 'Activo',
      client: 'Trackgenix SA',
      employees: {
        name: 'Carlos',
        lastName: 'Moreyra',
        role: 'DEV',
      },
      rates: {
        dev: 5,
        pm: 2,
        qa: 4,
      },
    });
    expect(response.status).toBe(400);
  });

  test('the status of the project should not be empty', async () => {
    const response = await request(app).post('/projects').send({
      name: 'Preparation',
      description: 'This is a project to prepare a surprise party',
      status: null,
      client: 'Trackgenix SA',
      employees: {
        name: 'Carlos',
        lastName: 'Moreyra',
        role: 'DEV',
      },
      rates: {
        dev: 5,
        pm: 2,
        qa: 4,
      },
    });
    expect(response.status).toBe(400);
  });

  test('the client of the project should not be empty', async () => {
    const response = await request(app).post('/projects').send({
      name: 'Preparation',
      description: 'This is a project to prepare a surprise party',
      status: 'Active',
      client: null,
      employees: {
        name: 'Carlos',
        lastName: 'Moreyra',
        role: 'DEV',
      },
      rates: {
        dev: 5,
        pm: 2,
        qa: 4,
      },
    });
    expect(response.status).toBe(400);
  });

  test('the employee of the project should not be empty', async () => {
    const response = await request(app).post('/projects').send({
      name: 'Preparation',
      description: 'This is a project to prepare a surprise party',
      status: 'Active',
      client: 'Trackgenix SA',
      employees: null,
      rates: {
        dev: 5,
        pm: 2,
        qa: 4,
      },
    });
    expect(response.status).toBe(400);
  });

  test('the rates of the project should not be empty', async () => {
    const response = await request(app).post('/projects').send({
      name: 'Preparation',
      description: 'This is a project to prepare a surprise party',
      status: 'Active',
      client: 'Trackgenix SA',
      employees: {
        name: 'Carlos',
        lastName: 'Moreyra',
        role: 'DEV',
      },
      rates: null,
    });
    expect(response.status).toBe(400);
  });
});

describe('DELETE /projects', () => {
  test('should delete a project', async () => {
    const response = await request(app).delete(`/projects/${projectId}`).send();
    expect(response.status).toBe(204);
  });
});
