const express = require('express');
const pgp = require('pg-promise')();
const fs = require('fs');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const path = require('path');
const jwt = require('jsonwebtoken');

const { database } = require('./config/database');
const routes = require('./routes');

const db = pgp(database);

db.none(fs.readFileSync('./createTable.sql').toString())
  .then(() => console.log('Table created'))
  .catch((error) => console.log('ERROR: ', error));

const app = express();

const port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(logger('combined'));
app.use(express.json());

app.use(
  cors({
    origin: ['https://friendrecord.netlify.app', 'http://localhost:5137'],
    credentials: true,
  })
);

app.use(function (req, res, next) {
  res.setHeader(
    'Access-control-Allow-Origin',
    'https://friendrecord.netlify.app'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, PATCH, DELETE'
  );
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-Requested-With,content-type'
  );
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

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

module.exports = { authenticateToken };

app.use(routes);

app.listen(port, () =>
  console.log(`🌎 ==> API Server now listening on port ${port}`)
);
