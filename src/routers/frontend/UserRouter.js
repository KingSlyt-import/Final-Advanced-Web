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

router.get('/deposit', UserController.deposit);

router.get('/transfer', UserController.transfer);

router.get('/drawback', UserController.drawback);

router.get('/mobile-card', UserController.mobileCard);

router.get('/trade', UserController.trade);

router.get('/information', UserController.information);

router.get('/change-pass', UserController.changePass);

router.get('/add-id-card', UserController.addIDCard);

router.get('/mobile-info', UserController.mobileInfo);

module.exports = router;