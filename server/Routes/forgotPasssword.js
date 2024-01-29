const express = require('express')

const router = express.Router();

const forgotPasswordcontroller = require('../Controllers/forgotPassword')

router.post('/forgotPassword',forgotPasswordcontroller.sendEmail)

router.post('/resetPassword',forgotPasswordcontroller.resetPassword)

module.exports = router;