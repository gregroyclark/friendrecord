const db = require('../models/friendModel');

/* 

  ==========================================

  Handles incoming HTTP requests
  Calls corresponding functions in the model

  ==========================================

*/

// Create friend

const createFriend = async (req, res) => {
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

const readAllFriends = async (req, res) => {
  try {
    const result = await db.readAllFriends(req.params.userId);
    res.send(result);
  } catch (err) {
    res.status(500).send(err);
  }
};

// Read one friend

const readOneFriend = async (req, res) => {
  try {
    const result = await db.readOneFriend(req.params.id);
    res.send(result);
  } catch (err) {
    res.status(500).send(err);
  }
};

// Update friend

const updateFriend = async (req, res) => {
  try {
    const result = await db.updateFriend(
      req.params.id,
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

// Delete friend

const deleteFriend = async (req, res) => {
  try {
    const result = await db.deleteFriend(req.params.id);
    res.send(result);
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports = {
  createFriend,
  readAllFriends,
  readOneFriend,
  updateFriend,
  deleteFriend,
};
