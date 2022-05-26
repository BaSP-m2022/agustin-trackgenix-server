import request from 'supertest';
import app from '../app';
import Tasks from '../models/Tasks';
import tasksSeed from '../seeds/tasks';

beforeAll(async () => {
  await Tasks.collection.insertMany(tasksSeed);
});

describe('GET /tasks', () => {
  describe('when the user wants the list of tasks', () => {
    test('response should return a 200 status', async () => {
      const response = await request(app).get('/api/tasks').send();
      expect(response.status).toBe(200);
    });
    test('response should return false error', async () => {
      const response = await request(app).get('/api/tasks').send();
      expect(response.body.error).toBeFalsy();
    });
    test('response should return success messagge', async () => {
      const response = await request(app).get('/api/tasks').send();
      expect(response.body.message).toEqual('Success');
    });
    test('response should return 404 when path is wrong', async () => {
      const response = await request(app).get('/tasks').send();
      expect(response.status).toBe(404);
    });
    test('response should return at least one task', async () => {
      const response = await request(app).get('/api/tasks').send();
      expect(response.body.data.length).toBeGreaterThan(0);
    });
  });
});

describe('GET /tasks/:id', () => {
  test('Response should return a 200 status', async () => {
    const response = await request(app).get('/api/tasks/62824ff02de0708e369fc99c').send();
    expect(response.status).toBe(200);
  });

  test('Response should return a false error', async () => {
    const response = await request(app).get('/api/tasks/62824ff02de0708e369fc99c').send();
    expect(response.error).toBeFalsy();
  });

  test('Response should return a task', async () => {
    const response = await request(app).get('/api/tasks/62824ff02de0708e369fc99c').send();
    expect(response.body.data).not.toBeNull();
  });

  test('Response should return a message', async () => {
    const response = await request(app).get('/api/tasks/62824ff02de0708e369fc99c').send();
    expect(response.message).not.toBeNull();
  });

  test('Response should return a true error', async () => {
    const response = await request(app).get('/api/tasks/:id').send();
    expect(response.error).toBeTruthy();
  });

  test('Response should return a error message', async () => {
    const response = await request(app).get('/api/tasks/:id').send();
    expect(response.message).not.toBeNull();
  });

  test('Response should return a 404 status', async () => {
    const response = await request(app).get('/api/tasks/62824ff02de0708e369fc99c1').send();
    expect(response.status).toBe(404);
  });

  test('Response should return true error', async () => {
    const response = await request(app).get('/api/tasks/62824ff02de0708e369fc99c2').send();
    expect(response.error).toBeTruthy();
  });

  test('Response should return a error message', async () => {
    const response = await request(app).get('/api/tasks/62824ff02de0708e369fc99c3').send();
    expect(response.message).not.toBeNull();
  });
});

describe('POST /tasks', () => {
  test('A task should be created', async () => {
    const response = await request(app).post('/api/tasks').send({
      name: 'random task',
      details: 'blablablabla',
    });
    expect(response.status).toBe(201);
  });

  test('Response should return a false error', async () => {
    const response = await request(app).post('/api/tasks').send({
      name: 'random task',
      details: 'blablablabla',
    });
    expect(response.error).toBeFalsy();
  });

  test('The message should indicate the creation of a task', async () => {
    const response = await request(app).post('/api/tasks').send({
      name: 'random task',
      details: 'blablablabla',
    });
    expect(response.body.message).toEqual('Success');
  });

  test('Response should return a 400 status', async () => {
    const response = await request(app).post('/api/tasks').send();
    expect(response.status).toBe(400);
  });

  test('Response should return a true error', async () => {
    const response = await request(app).post('/api/tasks').send();
    expect(response.error).toBeTruthy();
  });

  test('The message should indicate there was an error', async () => {
    const response = await request(app).post('/api/tasks').send();
    expect(response.body.message).toEqual('There was an error while the validation was requested');
  });
});

describe('PUT /tasks', () => {
  test('If the task is updated, response should return a 200 status', async () => {
    const response = await request(app).put('/api/tasks/62824ff02de0708e369fc99c').send({
      name: 'rand task',
    });
    expect(response.status).toBe(200);
  });

  test('If the details is updated, response should return a 200 status', async () => {
    const response = await request(app).put('/api/tasks/62824ff02de0708e369fc99c').send({
      details: 'blaa blu ble',
    });
    expect(response.status).toBe(200);
  });

  test('Response should return a false error', async () => {
    const response = await request(app).put('/api/tasks/62824ff02de0708e369fc99c').send({
      name: 'rand task',
    });
    expect(response.error).toBeFalsy();
  });

  test('The message should indicate that task is updated', async () => {
    const response = await request(app).put('/api/tasks/62824ff02de0708e369fc99c').send({
      name: 'rand task',
    });
    expect(response.body.message).toEqual('Success');
  });

  test('Wrong path should return a 404 status', async () => {
    const response = await request(app).put('/api/tasks').send();
    expect(response.status).toBe(404);
  });

  test('The message should indicate there was an error', async () => {
    const response = await request(app).put('/api/tasks/62824ff02de0708e369fc99c').send({
      name: 123,
    });
    expect(response.body.message).toEqual('There was an error while the validation was requested');
  });
});

describe('Delete a task', () => {
  test('Response should return a 204 status', async () => {
    const response = await request(app).delete('/api/tasks/62824ff02de0708e369fc99c').send();
    expect(response.status).toBe(204);
  });

  test('Response should return a 404 status', async () => {
    const response = await request(app).delete('/api/tasks/62824ff02de0708e369fc99c34').send();
    expect(response.status).toBe(404);
  });

  test('Message should indicate the id doesn`t exist', async () => {
    const response = await request(app).delete('/api/tasks/62824ff02de0708e369fc99ce34').send();
    expect(response.body.message).toEqual('Id 62824ff02de0708e369fc99ce34 does not exist');
  });

  test('Response shloud return a true error', async () => {
    const response = await request(app).delete('/api/tasks/62824ff02de0708e369fc99c').send();
    expect(response.error).toBeTruthy();
  });

  test('Response should return data undefined', async () => {
    const response = await request(app).delete('/api/tasks/62824ff02de0708e369fc99c').send();
    expect(response.data).toBeUndefined();
  });
});
