const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../../server');
const friendController = require('../../controllers/friendController');

router.get('/', (req, res) => {
  res.send('GET request to the homepage');
});
router.post('/', authenticateToken, friendController.createFriend);
router.get('/:userId', authenticateToken, friendController.readAllFriends);
router.get('/:id', authenticateToken, friendController.readOneFriend);
router.put('/:id', authenticateToken, friendController.updateFriend);
router.delete('/:id', authenticateToken, friendController.deleteFriend);

module.exports = router;
