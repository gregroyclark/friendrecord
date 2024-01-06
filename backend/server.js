const express = require('express');

const logger = require('morgan');
const cors = require('cors');
const path = require('path');

const routes = require('./routes');

const app = express();

const port = process.env.PORT || 5000;

app.use(logger('combined'));
app.use(express.json());
app.use(cors());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(routes);

app.listen(port, () =>
  console.log(`🌎 ==> API Server now listening on port ${port}`)
);
