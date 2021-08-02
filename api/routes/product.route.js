const express = require('express');
const router = express.Router();

const controllerApi = require('../controllers/product.controller');

router.get('/products', controllerApi.index);

router.post('/products', controllerApi.create);

router.delete('/products', controllerApi.delete)

module.exports = router;