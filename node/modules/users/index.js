const express = require('express');
const router = express.Router();

const authController = require('./controllers/authController');
const detailsController = require('./controllers/userDetailsController');

router.use('/api/user/auth', authController);
router.use('/api/user/details', detailsController);

module.exports = router;