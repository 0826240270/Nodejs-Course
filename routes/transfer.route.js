const express = require('express');
const router = express.Router();

const controller = require('../controller/transfer.controller');

router.get('/', controller.transferForm);

router.post('/', controller.transferMoney);

module.exports = router;