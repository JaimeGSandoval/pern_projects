const router = require('express').Router();
const pool = require('../db');
const bcrypt = require('bcrypt');
const jwtGenerator = require('../utils/jwtGenerator');
const validInfo = require('../middleware/validInfo');
const authorization = require('../middleware/authorization');

// registering
router.post('/register', validInfo, async (req, res) => {
  try {
    // 1. destructure req.body (name, email, password)
    const { name, email, password } = req.body;

    // 2. check if user already exists (if user exists throw error)
    const user = await pool.query('SELECT * FROM users WHERE user_email = $1', [
      email,
    ]);

    if (user.rows.length !== 0) {
      return res.status(401).json({
        status: 'Unauthenticated',
        data: {
          message: 'User already exists',
        },
      });
    }

    // 3. bcrypt the user password
    const saltRound = 10;
    const salt = await bcrypt.genSalt(saltRound);
    const bcryptPassword = await bcrypt.hash(password, salt);

    // 4. enter user into database
    const newUser = await pool.query(
      'INSERT INTO users (user_name, user_email, user_password) VALUES ($1, $2, $3) RETURNING *',
      [name, email, bcryptPassword]
    );

    // 5. generate jwt token
    const token = jwtGenerator(newUser.rows[0].user_id);

    res.status(201).json({
      status: 'Success',
      data: {
        message: 'New user created',
        token,
      },
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// login route
router.post('/login', validInfo, async (req, res) => {
  try {
    // 1. destructure req.body
    const { email, password } = req.body;

    // 2. check if use doesn't exist (if doesn't exist throw error)
    const user = await pool.query('SELECT * FROM users WHERE user_email = $1', [
      email,
    ]);

    if (user.rows.length === 0) {
      return res.status(401).json({
        status: 'Unauthenticated',
        data: {
          message: 'Password or Email is incorrect',
        },
      });
    }

    // 3. check if incoming password is the same as password in database
    const validPassword = await bcrypt.compare(
      password,
      user.rows[0].user_password
    );

    if (!validPassword) {
      return res.status(401).json({
        status: 'Unauthenticated',
        data: {
          message: 'Password or Email is incorrect',
        },
      });
    }

    // 4. give them jwt token
    const token = jwtGenerator(user.rows[0].user_id);

    res.status(200).json({
      status: 'Success',
      data: {
        message: `Welcome back ${user.rows[0].user_name}`,
        token,
      },
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

router.get('/is-verify', authorization, (req, res) => {
  try {
    res.json(true);
  } catch (error) {
    console.error(err.message);
    res.status(500).send('Not authorized');
  }
});

module.exports = router;
