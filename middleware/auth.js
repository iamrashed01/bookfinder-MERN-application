const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) {
    return res.status(400).json({ message: 'Please provide a valid token', success: false });
  }

  const decoded = await jwt.verify(token, process.env.JWT_PRIVATE_KEY);
  req.user = decoded;
  return next();
};
