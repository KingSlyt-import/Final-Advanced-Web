// core module
const UserController = require('../../controllers/frontend/UserController');

// npm module
const express = require('express');
const router = express.Router();

// routing
router.get('/register', UserController.register);

router.get('/login', UserController.login);
router.post('/login-process', UserController.loginProcess);
router.get('/recovery-pass', UserController.recoveryPass);

module.exports = router;