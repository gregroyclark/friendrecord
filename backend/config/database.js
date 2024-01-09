const { Pool } = require('pg');

require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  database: process.env.PG_DATABASE,
  host: process.env.PG_HOST,
  port: process.env.PG_PORT,
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
});

pool.connect((error) => {
  if (error) {
    console.error('Error connecting to the database: ', error);
    throw new Error('Error connecting to the database: ', error);
  } else {
    console.log(
      `Connected to the database on ${process.env.PG_HOST}:${process.env.PORT}`
    );
  }
});

pool.on('error', (error) => {
  console.error('Unexpected error on idle client', error);
});

const database = {
  connectionString: process.env.DATABASE_URL,
  database: process.env.PG_DATABASE,
  host: process.env.PG_HOST,
  port: process.env.PG_PORT,
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
};

module.exports = { pool, database };

// =========================================

/* 

  ==========================================

  MySQL works with planetscale & vercel.
  Render only has paid MySQL.
  Have to migrate to PostgreSQL.

  ==========================================

*/

// const mysql = require('mysql2');

// require('dotenv').config();

// // // local
// // const db = mysql.createPool({
// //   host: process.env.MYSQL_HOST,
// //   port: Number(process.env.MYSQL_PORT),
// //   user: process.env.MYSQL_USER,
// //   password: process.env.MYSQL_PASSWORD,
// //   database: process.env.MYSQL_DATABASE,
// // });

// // prod
// const db = mysql.createPool({
//   host: process.env.PLANETSCALE_DB_HOST,
//   // port: Number(process.env.MYSQL_PORT),
//   user: process.env.PLANETSCALE_DB_USERNAME,
//   password: process.env.PLANETSCALE_DB_PASSWORD,
//   database: process.env.PLANETSCALE_DB,
// });

// db.getConnection((err, connection) => {
//   if (err) throw err;
//   console.log('Connected to the database');
//   connection.release();
// });

// module.exports = { db };
