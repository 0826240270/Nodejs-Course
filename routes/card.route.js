const express = require('express');
const router = express.Router();

const controller = require('../controller/card.controller');

router.get('/add/:productId', controller.addToCard);

module.exports = router;