require('dotenv/config');
const express = require('express');
const pool = require('./db');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// get all users
app.get('/todos', async (req, res) => {
  try {
    const response = await pool.query('SELECT * FROM todo');

    res.status(200).json({
      status: 'Success',
      data: response.rows,
    });
  } catch (err) {
    console.error(err.message);
  }
});

// get single user
app.get('/todos/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const response = await pool.query(`SELECT * FROM todo WHERE todo_id = $1`, [
      id,
    ]);

    res.status(200).json({
      status: 'Success',
      data: response.rows,
    });
  } catch (err) {
    console.error(err.message);
  }
});

// create todo
app.post('/todos', async (req, res) => {
  const { description } = req.body;

  try {
    const newTodo = await pool.query(
      'INSERT INTO todo (description) VALUES ($1) RETURNING *',
      [description]
    );

    res.status(201).json({
      status: 'Success',
      data: {
        newTodo: newTodo.rows[0],
      },
    });
  } catch (err) {
    console.error(err.message);
  }
});

// update todo
app.put('/todos/:id', async (req, res) => {
  const { description } = req.body;
  const { id } = req.params;

  try {
    const response = await pool.query(
      'UPDATE todo SET description = $1 WHERE todo_id = $2 RETURNING *',
      [description, id]
    );

    res.status(200).json({
      status: 'Success',
      data: {
        data: response.rows,
        message: 'Todo updated',
      },
    });
  } catch (err) {
    console.error(err.message);
  }
});

// delete todo
app.delete('/todos/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const response = await pool.query(`DELETE FROM todo WHERE todo_id = $1`, [
      id,
    ]);

    res.status(200).json({
      status: 'Success',
      message: 'Todo deleted',
    });
  } catch (err) {
    console.error(err.message);
  }
});

const port = process.env.PORT;
app.listen(port, () => console.log(`I'm listening on port ${port}`));
