// core module
const AdminControllers = require('../controllers/AdminControllers');
const isLoggedIn = require('../utils/middlewares/login');

// npm module
const express = require('express');
const router = express.Router();

// routing
router.get('/', AdminControllers.getAdminControllers);
router.get('/get-all-account', isLoggedIn, AdminControllers.getAllAccount);
router.get('/get-waiting-list', isLoggedIn, AdminControllers.getWaitingList);
router.get('/get-verified-list', isLoggedIn, AdminControllers.getVerifiedList);
router.get('/get-disabled-list', isLoggedIn, AdminControllers.getDisabledList);
router.put('/verify-account/:email', isLoggedIn, AdminControllers.verifyAccount);
router.put('/unlock-account/:email', isLoggedIn, AdminControllers.unlockAccount);

module.exports = router;