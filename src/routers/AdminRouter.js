// core module
const AdminControllers = require('../controllers/AdminControllers');
const isLoggedIn = require('../utils/middlewares/login');
const isAdmin = require('../utils/middlewares/admin');

// npm module
const express = require('express');
const router = express.Router();

// routing
router.get('/', AdminControllers.getAdminControllers);

router.get('/get-all-account', isLoggedIn, isAdmin, AdminControllers.getAllAccount);

router.get('/get-waiting-list', isLoggedIn, isAdmin, AdminControllers.getWaitingList);
router.get('/get-verified-list', isLoggedIn, isAdmin, AdminControllers.getVerifiedList);
router.get('/get-disabled-list', isLoggedIn, isAdmin, AdminControllers.getDisabledList);
router.get('/get-softdisabled-list', isLoggedIn, isAdmin, AdminControllers.getSoftDisabledList);

router.put('/verify-account', isLoggedIn, isAdmin, AdminControllers.verifyAccount);
router.put('/unlock-account', isLoggedIn, isAdmin, AdminControllers.unlockAccount);

module.exports = router;