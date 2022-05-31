// core module
const WalletController = require('../../controllers/backend/WalletController');
const topUpValidator = require('../../utils/validators/topUpValidator');
const isLoggedIn = require('../../utils/middlewares/login');

// npm module
const express = require('express');
const router = express.Router();

// routing
router.post('/top-up', isLoggedIn, topUpValidator, WalletController.topUp);
router.get('/create', WalletController.create);

module.exports = router;