const express = require('express');
const router = express.Router();
// const authenticateToken = require('../../server').authenticateToken;
const {
  createFriend,
  readAllFriends,
  readOneFriend,
  updateFriend,
  deleteFriend,
} = require('../../controllers/friendController');

router.get('/', (req, res) => {
  res.send('GET request to the homepage');
});
router.post('/', createFriend);
router.get('/:userId', readAllFriends);
router.get('/:id', readOneFriend);
router.put('/:id', updateFriend);
router.delete('/:id', deleteFriend);
// router.post('/', authenticateToken, createFriend);
// router.get('/:userId', authenticateToken, readAllFriends);
// router.get('/:id', authenticateToken, readOneFriend);
// router.put('/:id', authenticateToken, updateFriend);
// router.delete('/:id', authenticateToken, deleteFriend);

module.exports = router;
