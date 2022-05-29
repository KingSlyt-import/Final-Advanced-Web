// core module
const UserController = require('../../controllers/frontend/UserController');
const router = require('../backend/AdminRouter');

// npm module

// routing
router.get('/login', UserController.login);
router.get('/register', UserController.register);

module.exports = router;