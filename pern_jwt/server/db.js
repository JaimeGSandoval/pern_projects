require('dotenv/config');
const Pool = require('pg').Pool;

const pool = new Pool({
  user: process.env.USER,
  password: process.env.POSTGRES_PASS,
  host: process.env.HOST,
  database: process.env.DATABASE,
  port: process.env.DB_PORT,
});

module.exports = pool;
