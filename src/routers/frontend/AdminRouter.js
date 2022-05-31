// core module
const AdminController = require('../../controllers/frontend/AdminController');

// npm module
const express = require('express');
const router = express.Router();

// routing
router.get('/receipt-info', AdminController.receiptinfo);

router.get('/user-list/:token/:status', AdminController.userlist);

router.get('/user-info/:token/:email', AdminController.infoAdmin);

module.exports = router;