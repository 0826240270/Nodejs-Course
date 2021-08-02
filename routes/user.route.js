const express = require('express');
const router = express.Router();

const multer = require('multer');

const upload = multer();
const controller = require('../controller/user.controller');

// Render template with data object
router.get('/', controller.getTemplateUsers);

// Query parameter
router.get('/search', controller.getSearchUsers)

// Requestb Params ID
router.get('/:id', controller.getviewID)

module.exports = router
