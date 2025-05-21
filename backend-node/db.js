const mysql = require('mysql2');

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'db',             // Docker service name or localhost
  user: process.env.DB_USER || 'budget_user',
  password: process.env.DB_PASSWORD || 'userpass',
  database: process.env.DB_NAME || 'budget_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool;
