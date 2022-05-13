const router = require('express').Router();
const pool = require('../db');
const authorization = require('../middleware/authorization');

router.get('/', authorization, async (req, res) => {
  try {
    // req.user has the payload, which has the user, which was decrypted from the token .i.e. "6c9e977c-7463-407c-8c10-39d142c27d80". We can now use this to get data about the person form the db.
    // res.json(req.user);

    // you do not want to send back sensitive data like passwords. Instead you can just send back the name or any other safe data
    const user = await pool.query(
      'SELECT user_name FROM users WHERE user_id = $1',
      [req.user]
    );

    res.json(user.rows[0]);
  } catch (error) {
    console.error(err.message);
    res.status(500).json('Server error');
  }
});

module.exports = router;
