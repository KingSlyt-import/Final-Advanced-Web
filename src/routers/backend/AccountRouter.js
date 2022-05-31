// core module
const AccountControllers = require('../../controllers/backend/AccountControllers');
const isLoggedIn = require('../../utils/middlewares/login');
// validators
const registerValidator = require('../../utils/validators/registerValidator');
const loginValidator = require('../../utils/validators/loginValidator');
const changePasswordValidator = require('../../utils/validators/changePasswordValidator');
const recoverRequestValidator = require('../../utils/validators/recoverRequestValidator');
const otpFormValidator = require('../../utils/validators/otpFormValidator');

// npm module
const express = require('express');
const router = express.Router();

// routing
router.get('/', AccountControllers.getAccountController);
router.get('/get-all-user', isLoggedIn, AccountControllers.getAllUser);
router.get('/get-user-by-email', AccountControllers.getUserByEmail);

router.post('/register', registerValidator, AccountControllers.register);
router.post('/login', loginValidator, AccountControllers.login);
router.post('/recover-password/:token', otpFormValidator, AccountControllers.recoverPassword);

router.get('/profile', isLoggedIn, AccountControllers.getProfile);
router.post('/change-password', isLoggedIn, changePasswordValidator, AccountControllers.changePassword);
router.post('/send-otp', recoverRequestValidator, AccountControllers.sendOTP);

module.exports = router;