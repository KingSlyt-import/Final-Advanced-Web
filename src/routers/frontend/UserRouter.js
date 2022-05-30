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
router.get('/mobileCard', UserController.mobileCard);
router.get('/trade', UserController.trade);
router.get('/information', UserController.information);
router.get('/changepass', UserController.changepass);
router.get('/addIDCard', UserController.addIDCard);
router.get('/mobileInfor', UserController.mobileInfor);

module.exports = router;