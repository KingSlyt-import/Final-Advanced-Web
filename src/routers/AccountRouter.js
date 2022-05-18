// core module
const AccountControllers = require('../controllers/AccountControllers');
const isLoggedIn = require('../utils/middlewares/login');
const registerValidator = require('../utils/validators/registerValidator');
const loginValidator = require('../utils/validators/loginValidator');

// npm module
const express = require('express');
const router = express.Router();

// routing
router.get('/', AccountControllers.getAccountController);
router.get('/get-all-user', isLoggedIn, AccountControllers.getAllUser);
router.get('/get-user-by-id', isLoggedIn, AccountControllers.getUserById);

router.post('/register', registerValidator, AccountControllers.register);
router.post('/login', loginValidator, AccountControllers.login);

router.get('/profile/:email', AccountControllers.getProfile);
router.post('/change-password/:email', isLoggedIn, AccountControllers.changePassword);

module.exports = router;