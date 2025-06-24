/**
 * auth.test.js – integration tests for /api/auth
 *
 *   ✔ POST /api/auth/register  201 on first signup
 *   ✔ POST /api/auth/register  409 on duplicate
 *   ✔ POST /api/auth/login     200 + token on valid creds
 *   ✔ POST /api/auth/login     401 on bad password
 *
 * The tests assume:
 *   • app.js exports an Express instance ( no app.listen() )
 *   • MySQL test DB is isolated (you can point to a Docker db or a
 *     test schema via env vars: DB_NAME=budget_db_test, etc.)
 */

const request = require('supertest');
const bcrypt  = require('bcrypt');
const { pool } = require('../db');        // MySQL pool
const app     = require('../app');       // Express app

// helpers ----------------------------------------------------------
const TEST_USER = {
  username: 'jestUser',
  email:    'jest@example.com',
  password: 'Test123$'
};

async function clearUser(username) {
  await pool.execute('DELETE FROM users WHERE username = ?', [username]);
}

// ------------------------------------------------------------------
beforeAll(async () => {
  await clearUser(TEST_USER.username);
});

afterAll(async () => {
  await clearUser(TEST_USER.username);
  await pool.end(); // close pool so Jest exits
});

describe('Auth API', () => {
  it('registers a new user (201)', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send(TEST_USER)
      .expect(201);

    expect(res.body).toMatchObject({
      id: expect.any(Number),
      username: TEST_USER.username,
      email: TEST_USER.email
    });
  });

  it('rejects duplicate registration (409)', async () => {
    await request(app)
      .post('/api/auth/register')
      .send(TEST_USER)
      .expect(409);
  });

  it('logs in with valid credentials (200 + token)', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        username: TEST_USER.username,
        password: TEST_USER.password
      })
      .expect(200);

    expect(res.body).toHaveProperty('token');
    expect(typeof res.body.token).toBe('string');
  });

  it('fails login with wrong password (401)', async () => {
    await request(app)
      .post('/api/auth/login')
      .send({
        username: TEST_USER.username,
        password: 'WrongPass!'
      })
      .expect(401);
  });
});

afterAll(async () => {
  await pool.end();          // graceful shutdown so Jest exits
});
