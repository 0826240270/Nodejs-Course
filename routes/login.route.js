const express = require('express');
const router = express.Router();

const controller = require('../controller/auth.login.controller');

router.get('/', controller.login);

router.post('/', controller.signIn);

module.exports = router;