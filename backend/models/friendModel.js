const db = require('../config/database');

/* 

  ==========================================

  Database queries

  ==========================================

*/

// createFriend

exports.createFriend = (
  firstName,
  lastName,
  email,
  phoneNumber,
  notes,
  userId
) => {
  return new Promise((resolve, reject) => {
    const query = 'INSERT INTO friends SET ?';
    const values = { firstName, lastName, email, phoneNumber, notes, userId };
    db.query(query, values, (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};

// readAllFriends

exports.readAllFriends = () => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM friends';
    db.query(query, (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};

// readOneFriend

// updateFriend

// deleteFriend
