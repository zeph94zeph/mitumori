import request from 'supertest';
import { app } from '../app';

describe('App', () => {
  it('returns 404 for unknown routes', async () => {
    const response = await request(app).get('/unknown');
    expect(response.status).toBe(404);
  });
});
