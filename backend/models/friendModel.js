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

exports.readAllFriends = (userId) => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM friends';
    db.query(query, [userId], (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};

// readOneFriend

exports.readOneFriend = (id) => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM friends WHERE id = ?';
    db.query(query, [id], (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};

// updateFriend

// deleteFriend
