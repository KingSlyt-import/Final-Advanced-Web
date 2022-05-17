// core module
const AdminControllers = require('../controllers/AdminControllers');

// npm module
const express = require('express');
const router = express.Router();

// routing
router.get('/', AdminControllers.getAdminControllers);

module.exports = router;