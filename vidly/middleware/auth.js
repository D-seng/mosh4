const jwt = require('jsonwebtoken');
const config = require('config');

function auth (req, res, next) {
  const token = req.header('x-auth-token');
  if (!token) return res.status(401).send('Access denied. No token provided.')

  try {
    // jwtPrivateKey is the key for decoding the token. It is stored in an environment variable.
    const decodedPayload = jwt.verify(token, config.get('jwtPrivateKey'));
    console.log(decodedPayload);
    req.user = decodedPayload;
    next();
  }
  catch(e) {
    res.status(400).send('Invalid token.')
  }
}
module.exports = auth;