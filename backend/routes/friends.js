const express = require('express');
const router = express.Router();
const friendController = require('../controllers/friendController');

router.post('/friends', friendController.createFriend);
router.get('/friends/:userId', friendController.readAllFriends);
router.get('/friends/:id', friendController.readOneFriend);
router.put('/friends/:id', friendController.updateFriend);
router.delete('/friends/:id', friendController.deleteFriend);

module.exports = router;
