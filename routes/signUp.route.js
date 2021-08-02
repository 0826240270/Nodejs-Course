const express = require('express');
const multer = require('multer');
const upload = multer({ dest: './public/uploads' })

const router = express.Router();

const controller = require('../controller/signUp.controller');

router.get('/', controller.pageSignUp);

router.post('/', upload.single('avatar'), controller.signUp);

module.exports = router;