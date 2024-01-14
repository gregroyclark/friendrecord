const express = require('express');
const router = express.Router();

const {
  createFriend,
  readAllFriends,
  readOneFriend,
  updateFriend,
  deleteFriend,
} = require('../../controllers/friendController');

router.post('/createFriend', createFriend);
router.get('/readAllFriends/:userId', readAllFriends);
router.get('/readOneFriend/:id', readOneFriend);
router.put('/updateFriend/:id', updateFriend);
router.delete('/deleteFriend/:id', deleteFriend);

module.exports = router;
