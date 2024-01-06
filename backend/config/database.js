const mysql = require('mysql2');

require('dotenv').config();

const db = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  port: process.env.MYSQL_PORT,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_NAME,
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to the database');
});

module.exports = { db };
