const db = require('../models/friendModel');

// Read all friends

exports.readAllFriends = () => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM friends';
    db.query(query, (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};
