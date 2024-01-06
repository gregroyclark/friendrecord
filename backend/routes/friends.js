const express = require('express');
const router = express.Router();
const friendController = require('../controllers/friendController');

router.get('/', friendController.readAllFriends);

module.exports = router;
