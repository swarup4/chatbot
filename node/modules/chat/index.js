const express = require('express');
const router = express.Router();

const chatController = require('./controllers/chatController');

router.use('/api/chat', chatController);

module.exports = router;