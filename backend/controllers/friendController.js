const db = require('../models/friendModel');

// Read all friends

exports.readAllFriends = async (req, res) => {
  try {
    const result = await db.readAllFriends();
    res.send(result);
  } catch (err) {
    res.status(500).send(err);
  }
};
