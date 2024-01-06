const path = require('path');
const router = require('express').Router();
const friendRoutes = require('./friends');

// Friend routes
router.use('/friends', friendRoutes);

router.use(function (req, res) {
  res.sendFile(path.join(__dirname, '../../../frontend/build/index.html'));
});

module.exports = router;
