// core module
const UserController = require('../../controllers/frontend/UserController');

// npm module
const express = require('express');
const router = express.Router();

// routing
router.get('/login', UserController.login);
router.get('/register', UserController.register);

module.exports = router;