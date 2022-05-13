// core module
const AccountControllers = require('../controllers/AccountControllers');
const isLoggedIn = require('../utils/middlewares/login');
const registerValidator = require('../utils/validators/registerValidator');
const loginValidator = require('../utils/validators/loginValidator');

// npm module
const express = require('express');
const router = express.Router();

// routing
router.get('/', isLoggedIn, AccountControllers.getAccountController);
router.get('/get-all-user', isLoggedIn, AccountControllers.getAllUser);
router.post('/register', registerValidator, AccountControllers.register);

module.exports = router;