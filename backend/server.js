const express = require('express');

const logger = require('morgan');
const cors = require('cors');
const path = require('path');
const jwt = require('jsonwebtoken');

const routes = require('./routes');

const app = express();

// auth goes here
function authenticateToken(req, res, next) {
  const token = req.cookies.jwt;
  if (token == null)
    return res.status(401).send({ message: 'No token provided' });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err)
      return res.status(403).send({ message: 'Failed to authenticate token' });
    req.user = user;
    next();
  });
}

const port = process.env.PORT || 5000;

app.use(logger('combined'));
app.use(express.json());
app.use(cors());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(routes);

module.exports.authenticateToken = authenticateToken;

app.listen(port, () =>
  console.log(`🌎 ==> API Server now listening on port ${port}`)
);
