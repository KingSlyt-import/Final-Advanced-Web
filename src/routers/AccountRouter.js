// core module
const AccountControllers = require('../controllers/AccountControllers');
const isLoggedIn = require('../utils/middlewares/login');
const registerValidator = require('../utils/validators/registerValidator');
const loginValidator = require('../utils/validators/loginValidator');
const changePasswordValidator = require('../utils/validators/changePasswordValidator');

// npm module
const express = require('express');
const router = express.Router();

// routing
router.get('/', AccountControllers.getAccountController);
router.get('/get-all-user', isLoggedIn, AccountControllers.getAllUser);
router.get('/get-user-by-email', isLoggedIn, AccountControllers.getUserByEmail);

router.post('/register', registerValidator, AccountControllers.register);
router.post('/login', loginValidator, AccountControllers.login);

router.get('/profile', isLoggedIn, AccountControllers.getProfile);
router.post('/change-password', isLoggedIn, changePasswordValidator, AccountControllers.changePassword);

module.exports = router;