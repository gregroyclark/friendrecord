const db = require('../config/database');

exports.createUser = (email, password, role) => {
  return new Promise((resolve, reject) => {
    const query = 'INSERT INTO users SET ?';
    const values = { email, password, role };
    db.query(query, values, (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};

exports.findUserByEmail = (email) => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM users WHERE email = ?';
    db.query(query, [email], (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};
