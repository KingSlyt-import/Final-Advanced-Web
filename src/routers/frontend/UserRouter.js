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
router.post('/recovery-pass-process', UserController.recoveryPassProcess);

router.get('/recover-password/:token', UserController.recoverPassword);
router.post('/recover-password/:token', UserController.recoverPasswordProcess);

router.get('/deposit/:token', UserController.deposit);
router.post('/deposit-process/:token', UserController.depositProcess);

router.get('/transfer/:token', UserController.transfer);

router.post('/first-log-process/:token', UserController.firstLogProcess)

router.get('/drawback/:token', UserController.drawback);

router.get('/mobile-card/:token', UserController.mobileCard);

router.get('/trade/:token', UserController.trade);

router.get('/information/:token', UserController.information);

router.get('/change-pass/:token', UserController.changePass);
router.post('/change-pass-processing/:token', UserController.changePassProcess);

// router.get('/add-id-card/:token', UserController.addIDCard);

router.get('/mobile-info/:token', UserController.mobileInfo);

router.get('/contact-user/:token', UserController.contactLogined);

router.get('/detail-trade/:token', UserController.detailedTrade);

router.get('/user/contact-user/:token', UserController.contactLogined);
module.exports = router;