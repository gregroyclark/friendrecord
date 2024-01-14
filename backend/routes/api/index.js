const router = require('express').Router();
const friendRoutes = require('./friends');
const userRoutes = require('./users');

// Friend routes
router.use('/friends', friendRoutes);

// User routes
router.use('/users', userRoutes);

module.exports = router;
