const express = require('express');
const router = express.Router();
const { uploadPOI, searchPOIs } = require('../controllers/poi.controller.js');
const { protect, admin } = require('../middleware/auth.middleware.js');

// protect = must be logged in
// admin = must be admin
router.post('/upload', protect, admin, uploadPOI);

// protect = must be logged in
router.post('/search', protect, searchPOIs);

module.exports = router;