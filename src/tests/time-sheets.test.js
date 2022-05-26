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

let idEmployeeCreated;

const requestBody = {
  date: '2021-02-05T03:00:00.000Z',
  regularHours: 1,
  overtimeHours: 6,
  startTime: 10,
  endTime: 11,
  task: '62824ff02de0708e369fc99c',
  employee: '62825273c598dd23e9742740',
  project: '628281797161c78df5f6ac9e',
};
const incorrectRequestBody = {
  date: '2021-02-05T03:00:00.000Z',
  regularHours: 'aA',
  overtimeHours: 6,
  startTime: 10,
  endTime: 11,
  task: '62824ff02de0708e369fc99c',
  employee: '62825273c598dd23e9742740',
  project: '628281797161c78df5f6ac9e',
};

describe('POST /time-sheets', () => {
  test('With a correct timesheet body the response should return a status 201', async () => {
    const response = await request(app).post('/api/time-sheets').send(requestBody);
    expect(response.status).toBe(201);
    // eslint-disable-next-line no-underscore-dangle
    idEmployeeCreated = response.body.data._id;
  });

  test('With a correct timesheet body the response should return a correct message', async () => {
    const response = await request(app).post('/api/time-sheets').send(requestBody);
    expect(response.body.message).toEqual('The time-sheet created successfully');
  });

  test('With a correct timesheet body the response should return the created timesheet data', async () => {
    const response = await request(app).post('/api/time-sheets').send(requestBody);
    expect(response.body.data).toMatchObject(requestBody);
  });

  test('With a correct timesheet body the response should return a error false', async () => {
    const response = await request(app).post('/api/time-sheets').send(requestBody);
    expect(response.body.error).toBe(false);
  });

  test('With an incorrect timesheet body the response should return a status 400', async () => {
    const response = await request(app).post('/api/time-sheets').send(incorrectRequestBody);
    expect(response.status).toBe(400);
  });

  test('With an incorrect timesheet body the response should return error info in data', async () => {
    const response = await request(app).post('/api/time-sheets').send(incorrectRequestBody);
    expect(response.body.data).toMatch(/^[a-zA-Z0-9_ /'"]/);
  });

  test('With an incorrect timesheet body the response should return error true', async () => {
    const response = await request(app).post('/api/time-sheets').send(incorrectRequestBody);
    expect(response.body.error).toBeTruthy();
  });
});

/*
const putTimeSheetCases = [
  ['date', '2021-04-05T03:00:00.000Z'],
  ['regularHours', 44],
  ['overtimeHours', 44],
  ['startTime', 44],
  ['endTime', 44],
  ['task', '62824ff02de0708e369fc99c'],
  ['employee', '62825273c598dd23e9742740'],
  ['project', '628281797161c78df5f6ac9e'],
];
*/

const putRequestBody = { date: '2021-04-05T03:00:00.000Z' };
const incorrectPutRequestBody = { regularHours: 'asdasd' };
describe('PUT /time-sheets', () => {
  test('With a correct timesheet body the response should return a status 200', async () => {
    const response = await request(app).put('/api/time-sheets/62817f32ba9843827a61371f').send(putRequestBody);
    expect(response.status).toBe(200);
    // eslint-disable-next-line no-underscore-dangle
    idEmployeeCreated = response.body.data._id;
  });

  test('With a correct timesheet body the response should return a correct message', async () => {
    const response = await request(app).put('/api/time-sheets/62817f32ba9843827a61371f').send(putRequestBody);
    expect(response.body.message).toEqual('The time-sheet updated successfully');
  });

  test('With a correct timesheet body the response should return a error false', async () => {
    const response = await request(app).put('/api/time-sheets/62817f32ba9843827a61371f').send(putRequestBody);
    expect(response.body.error).toBe(false);
  });

  test('With an incorrect timesheet body the response should return a status 400', async () => {
    const response = await request(app).put('/api/time-sheets/62817f32ba9843827a61371f').send(incorrectPutRequestBody);
    expect(response.status).toBe(400);
  });

  test('With an incorrect timesheet body the response should return error info in data', async () => {
    const response = await request(app).put('/api/time-sheets/62817f32ba9843827a61371f').send(incorrectPutRequestBody);
    expect(response.body.data).toMatch(/^[a-zA-Z0-9_ /'"]/);
  });

  test('With an incorrect timesheet body the response should return error true', async () => {
    const response = await request(app).put('/api/time-sheets/62817f32ba9843827a61371f').send(incorrectPutRequestBody);
    expect(response.body.error).toBeTruthy();
  });
});

describe('DELETE /time-sheets/:id', () => {
  test('With an incorrect id the response should return a status 400', async () => {
    const response = await request(app).delete('/api/time-sheets/asdf56165').send();
    expect(response.status).toBe(400);
  });

  test('With an incorrect route the response should return a status 404', async () => {
    const response = await request(app).delete('/api/employe/62817f32ba9843827a61371f').send();
    expect(response.status).toBe(404);
  });

  test('With an nonexistent id the response should return a status 404', async () => {
    const response = await request(app).delete('/api/time-sheets/62898d14882f8759987f5b50').send();
    expect(response.status).toBe(404);
  });

  test('With an nonexistent id the response should return a error true', async () => {
    const response = await request(app).delete('/api/time-sheets/62898d14882f8759987f5b50').send();
    expect(response.body.error).toBe(true);
  });

  test('With an nonexistent id the response should return a data undefined', async () => {
    const response = await request(app).delete('/api/time-sheets/62898d14882f8759987f5b50').send();
    expect(response.body.data).toBeUndefined();
  });

  test('With an nonexistent id the response should return a non empty message', async () => {
    const response = await request(app).delete('/api/time-sheets/62898d14882f8759987f5b50').send();
    expect(response.body.message.length).toBeGreaterThan(5);
  });

  test('With an correct id the response should return a status 204', async () => {
    const response = await request(app).delete(`/api/time-sheets/${idEmployeeCreated}`).send();
    expect(response.status).toBe(204);
  });
});
