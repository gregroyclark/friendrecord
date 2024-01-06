const mysql = require('mysql2');

require('dotenv').config();

const db = mysql.createPool({
  host: process.env.MYSQL_HOST,
  port: Number(process.env.MYSQL_PORT),
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});

db.getConnection((err, connection) => {
  if (err) throw err;
  console.log('Connected to the database');
  connection.release();
});

module.exports = { db };
