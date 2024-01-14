const router = require('express').Router();
const apiRoutes = require('./api');

// API routes
router.use(
  '/api',
  (req, res, next) => {
    res.header(
      'Access-Control-Allow-Origin',
      'https://friendrecord.netlify.app',
      'http://localhost:5173'
    );
    next();
  },
  apiRoutes
);

module.exports = router;
