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

router.get('/deposit/:token', UserController.deposit);

router.get('/transfer/:token', UserController.transfer);

router.get('/drawback/:token', UserController.drawback);

router.get('/mobile-card/:token', UserController.mobileCard);

router.get('/trade/:token', UserController.trade);

router.get('/information/:token', UserController.information);

router.get('/change-pass/:token', UserController.changePass);

router.get('/add-id-card/:token', UserController.addIDCard);

router.get('/mobile-info/:token', UserController.mobileInfo);

router.get('/contact-user/:token', UserController.contactLogined);

router.get('/detail-trade/:token', UserController.detailedTrade);

module.exports = router;