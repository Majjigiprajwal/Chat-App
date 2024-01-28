const express = require('express');
const isAuth = require('../Middleware/isAuth')
const multerMiddleware= require('../Middleware/multer')
const router = express.Router();
const upload = multerMiddleware.multer.single('image');

const messageController = require('../Controllers/message')

router.post('/send-message',isAuth,messageController.postMessage);

router.get('/get-messages',isAuth,messageController.getMessages);

router.post('/saveImage',isAuth,upload,messageController.saveImageToS3);

module.exports = router;