// core module
const UserController = require('../../controllers/frontend/UserController');

// npm module
const express = require('express');
const router = express.Router();

// routing
router.get('/register', UserController.register);
router.post('/register-process', UserController.registerProcess);

router.get('/login', UserController.login);
router.post('/login-process', UserController.loginProcess);

router.get('/recovery-pass', UserController.recoveryPass);

router.get('/deposit', UserController.deposit);

router.get('/transfer', UserController.transfer);

router.get('/drawback', UserController.drawback);

router.get('/mobile-card', UserController.mobileCard);

router.get('/trade', UserController.trade);

router.get('/information/:token', UserController.information);

router.get('/change-pass', UserController.changePass);

router.get('/add-id-card', UserController.addIDCard);

router.get('/mobile-info', UserController.mobileInfo);

router.get('/contact-user', UserController.contactLogined);

router.get('/detail-trade', UserController.detailedTrade);
module.exports = router;