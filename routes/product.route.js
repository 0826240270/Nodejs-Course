const express = require('express');
const router = express.Router();

const controller = require('../controller/product.controller')
const sessionID = require('../controller/sessionID.controller');

router.get('/', sessionID.sessionID, controller.product);

router.get('/search', controller.searchProduct);

module.exports = router;