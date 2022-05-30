// core module
const WalletController = require('../../controllers/backend/WalletController');

// npm module
const express = require('express');
const router = express.Router();

// routing
router.post('/top-up', WalletController.topUp);
router.post('/create', WalletController.create);

module.exports = router;