import request from 'supertest';
import app from '../app';

import TimeSheets from '../models/Time-Sheets';
import Employees from '../models/Employees';
import Tasks from '../models/Tasks';
import Projects from '../models/Projects';

import timeSheet from '../seeds/time-sheets';
import employee from '../seeds/employees';
import task from '../seeds/tasks';
import project from '../seeds/projects';

beforeAll(async () => {
  await TimeSheets.collection.insertMany(timeSheet);
  await Employees.collection.insertMany(employee);
  await Tasks.collection.insertMany(task);
  await Projects.collection.insertMany(project);
});

const getTimeSheetCases = [['task', 3], ['employee', 12], ['project', 7]];

describe('GET /time-sheets', () => {
  test('With correct route response should return a status 200', async () => {
    const response = await request(app).get('/api/time-sheets').send();
    expect(response.status).toBe(200);
  });

  test('With correct route response should return a false error', async () => {
    const response = await request(app).get('/api/time-sheets').send();
    expect(response.body.error).toBe(false);
  });

  test('With correct route response should return a non empty message', async () => {
    const response = await request(app).get('/api/time-sheets').send();
    expect(response.body.message.length).toBeGreaterThan(2);
  });
  test('With correct route response should return a non empty data', async () => {
    const response = await request(app).get('/api/time-sheets').send();
    expect(response.body.data.length).toBeGreaterThan(0);
  });

  test.each(getTimeSheetCases)(
    'With correct route response should return populated %s data',
    async (key, length) => {
      const response = await request(app).get('/api/time-sheets').send();
      expect(Object.keys(response.body.data[0][key]).length).toBe(length);
    },
  );

  test('With an incorrect route the response should return a status 404', async () => {
    const response = await request(app).get('/api/ttt').send();
    expect(response.status).toBe(404);
  });
});

describe('GET BY ID /time-sheets/:id', () => {
  test('With an incorrect id the response should return a status 400', async () => {
    const response = await request(app).get('/api/time-sheets/asdf56165').send();
    expect(response.status).toBe(400);
  });

  test('With an incorrect id the response should return an undefinded message', async () => {
    const response = await request(app).get('/api/time-sheets/asdf56165').send();
    expect(response.message).toBeUndefined();
  });

  test('With an incorrect id the response should return an undefinded error', async () => {
    const response = await request(app).get('/api/time-sheets/asdf56165').send();
    expect(response.message).toBeUndefined();
  });

  test('With an incorrect id the response should return an undefinded data', async () => {
    const response = await request(app).get('/api/time-sheets/asdf56165').send();
    expect(response.data).toBeUndefined();
  });

  const nonExistentId = '5e8f8f8f8f8f8f8f8f8f8f8f';
  test('With an nonexistent id the response should return a status 404', async () => {
    const response = await request(app).get(`/api/time-sheets/${nonExistentId}`).send();
    expect(response.status).toBe(404);
  });

  test('With an nonexistent id the response should return an defined message', async () => {
    const response = await request(app).get(`/api/time-sheets/${nonExistentId}`).send();
    expect(response.body.message).toBe(`Id ${nonExistentId} does not exist`);
  });

  test('With an nonexistent id the response should return a error true', async () => {
    const response = await request(app).get(`/api/time-sheets/${nonExistentId}`).send();
    expect(response.body.error).toBe(true);
  });

  test('With an nonexistent id the response should return an undefined data', async () => {
    const response = await request(app).get(`/api/time-sheets/${nonExistentId}`).send();
    expect(response.body.data).toBeUndefined();
  });

  const existentId = '62817f32ba9843827a61371f';
  test('With an existent id the response should return a status 200', async () => {
    const response = await request(app).get(`/api/time-sheets/${existentId}`).send();
    expect(response.status).toBe(200);
  });

  test('With an existent id the response should return a message: Success', async () => {
    const response = await request(app).get(`/api/time-sheets/${existentId}`).send();
    expect(response.body.message).toEqual('Success');
  });

  test('With an existent id the response should return an error false', async () => {
    const response = await request(app).get(`/api/time-sheets/${existentId}`).send();
    expect(response.body.error).toBe(false);
  });

  test('With an existent id the response should return a not undefined data', async () => {
    const response = await request(app).get(`/api/time-sheets/${existentId}`).send();
    expect(response.body.data).not.toBeUndefined();
  });

  test('With an existent id the response should return a time sheet data', async () => {
    const response = await request(app).get(`/api/time-sheets/${existentId}`).send();
    expect(Object.keys(response.body.data).length).toBe(9);
  });

  test.each(getTimeSheetCases)(
    'With an existent id response should return populated %s data',
    async (key, length) => {
      const response = await request(app).get(`/api/time-sheets/${existentId}`).send();
      expect(Object.keys(response.body.data[key]).length).toBe(length);
    },
  );
});
