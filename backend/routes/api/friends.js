const express = require('express');
const router = express.Router();
const friendController = require('../../controllers/friendController');

router.get('/', (req, res) => {
  res.send('GET request to the homepage');
});
router.post('/', friendController.createFriend);
router.get('/:userId', friendController.readAllFriends);
router.get('/:id', friendController.readOneFriend);
router.put('/:id', friendController.updateFriend);
router.delete('/:id', friendController.deleteFriend);

module.exports = router;
