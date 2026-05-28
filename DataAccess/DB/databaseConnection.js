const sql = require('mysql');

const config = {
  user: 'rootuser',
  password: 'RootRootRootRoot',
  server: 'localhost',
  database: 'dailyquestions_db',
};

let pool;

async function getConnection() {
  if (!pool) {
    pool = await sql.connect(config);
  }
  return pool;
}

async function closeConnection() {
  if (pool) {
    await pool.close();
    pool = null;
  }
}

module.exports = {
  getConnection,
  closeConnection,
};
