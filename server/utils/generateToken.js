const jwt = require('jsonwebtoken');

const generateToken = (id) => {
  const secret = process.env.JWT_SECRET?.trim();
  if (!secret) {
    throw new Error('JWT_SECRET is not configured. Add a secret to server/.env and restart the server.');
  }

  return jwt.sign({ id }, secret, {
    expiresIn: '30d',
  });
};

module.exports = generateToken;