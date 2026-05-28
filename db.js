const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || 'rootuser',
  password: process.env.DB_PASSWORD || 'RootRootRootRoot',
  database: process.env.DB_NAME || 'dailyquestions_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

module.exports = pool;
