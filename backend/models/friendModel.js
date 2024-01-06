const db = require('../config/database');

exports.readAllFriends = () => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM friends';
    db.query(query, (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};
