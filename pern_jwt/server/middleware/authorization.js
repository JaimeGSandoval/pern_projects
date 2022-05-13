require('dotenv/config');
const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
  try {
    const jwtToken = req.header('token');

    if (!jwtToken) {
      return res.status(403).json({
        status: 'Unauthorized',
        message: 'You are not authorized',
      });
    }

    const payload = jwt.verify(jwtToken, process.env.JWT_SECRET);

    if (!payload) {
      return res.status(403).json({
        status: 'Unauthorized',
        message: 'You are not authorized',
      });
    }

    req.user = payload.user; // user_id we get from jwt encryption. We now have access to using that user_id within our application as req.user

    next();
  } catch (error) {
    console.error(err.message);
    res.status(403).json({
      status: 'Unauthorized',
      message: 'You are not authorized',
    });
  }
};
