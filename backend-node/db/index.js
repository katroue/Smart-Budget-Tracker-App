// backend-node/db/index.js
// -------------------------------------------------------------
//  MySQL connection pool (mysql2/promise)
//
//  • Reads credentials from environment variables
//  • Falls back to sensible defaults for local dev
//  • Exposes `pool`, plus a `closePool()` helper for Jest
// -------------------------------------------------------------

require('dotenv').config();               // loads .env if present
const mysql = require('mysql2/promise');

const {
  DB_HOST      = 'localhost',             // Docker service name: "db" in compose
  DB_PORT      = 3306,
  DB_USER      = 'budget_user',
  DB_PASSWORD  = 'userpass',
  DB_NAME      = process.env.NODE_ENV === 'test'
                   ? 'budget_db_test'     // use separate schema for tests
                   : 'budget_db',
  DB_CONN_LIMIT = 10
} = process.env;

// Create the pool only once
const pool = mysql.createPool({
  host              : DB_HOST,
  port              : DB_PORT,
  user              : DB_USER,
  password          : DB_PASSWORD,
  database          : DB_NAME,
  waitForConnections: true,
  connectionLimit   : Number(DB_CONN_LIMIT),
  queueLimit        : 0,
  charset           : 'utf8mb4'
});

/**
 * Gracefully close the pool.
 * Jest (or any script) should await closePool() in afterAll().
 */
async function closePool() {
  try {
    await pool.end();
    // console.log('MySQL pool closed');
  } catch (err) {
    console.error('Error closing MySQL pool', err);
  }
}

module.exports = { pool, closePool };

