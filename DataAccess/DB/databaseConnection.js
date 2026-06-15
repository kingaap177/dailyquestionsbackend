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

//sqa_9c46b120914c5b8b7a1277fc07eb2ff01b0f1c1e