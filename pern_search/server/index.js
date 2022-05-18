require('dotenv/config');
const express = require('express');
const pool = require('./db');
const cors = require('cors');

const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes
app.get('/users', async (req, res) => {
  try {
    const { name } = req.query;

    // This example displays bad practice and leaves it open to SQL injection. Never use template strings for your queries. Template strings can allow malicious users to inject their own queries
    // const users = await pool.query(
    //   `SELECT * FROM users WHERE first_name || ' ' || last_name ILIKE '% ${name}%'`
    // );

    // explanation of concat with ||
    // first_name last_name => %${}%
    // "Thomas Jones" => %nes%
    // In SQL, || => concat

    // Using the query below with the $1 variable and the [`%{name}%`] as the second argument to pool.query is a way to protect against sql injections. It helps filter the data/query that'll be going into out database
    const users = await pool.query(
      "SELECT * FROM users WHERE first_name || ' ' || last_name ILIKE $1",
      [`%${name}%`]
    );

    res.json(users.rows);
  } catch (error) {
    console.error(error.message);
  }
});

const port = process.env.PORT;
app.listen(port, () => console.log(`i'm listening on port ${port}`));
