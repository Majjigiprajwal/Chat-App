const express = require('express');
const isAuth = require('../Middleware/isAuth')
const router = express.Router();

const messageController = require('../Controllers/message')

router.post('/send-message',isAuth,messageController.postMessage);

router.get('/get-messages',isAuth,messageController.getMessages);


module.exports = router;