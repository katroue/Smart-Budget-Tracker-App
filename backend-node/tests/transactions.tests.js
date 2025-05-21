const request = require('supertest');
const app = require('../app'); // assuming app.js exports your Express app

describe('GET /api/transactions', () => {
  it('should return a list of transactions', async () => {
    const res = await request(app)
      .get('/api/transactions')
      .set('Authorization', 'Bearer mockToken'); // only if you're using auth

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
