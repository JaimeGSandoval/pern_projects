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

    req.user = payload.user; // get user from jwt encryption

    next();
  } catch (error) {
    console.error(err.message);
    res.status(403).json({
      status: 'Unauthorized',
      message: 'You are not authorized',
    });
  }
};
