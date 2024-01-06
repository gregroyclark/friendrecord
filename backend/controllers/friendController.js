const db = require('../models/friendModel');

/* 

  ==========================================

  Handles incoming HTTP requests
  Calls corresponding functions in the model

  ==========================================

*/

// Create friend

exports.createFriend = async (req, res) => {
  try {
    const result = await db.createFriend(
      req.body.firstName,
      req.body.lastName,
      req.body.email,
      req.body.phoneNumber,
      req.body.notes,
      req.body.userId
    );
    res.send(result);
  } catch (err) {
    res.status(500).send(err);
  }
};
// Read all friends

exports.readAllFriends = async (req, res) => {
  try {
    const result = await db.readAllFriends(req.params.userId);
    res.send(result);
  } catch (err) {
    res.status(500).send(err);
  }
};

// Read one friend

exports.readOneFriend = async (req, res) => {
  try {
    // stuff
  } catch (err) {
    res.status(500).send(err);
  }
};

// Update friend

exports.updateFriend = async (req, res) => {
  try {
    // stuff
  } catch (err) {
    res.status(500).send(err);
  }
};

// Delete friend

exports.deleteFriend = async (req, res) => {
  try {
    // stuff
  } catch (err) {
    res.status(500).send(err);
  }
};
