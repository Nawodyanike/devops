const express = require('express');
const router = express.Router();
//const { createorder, findallorders } = require('../controller/OrderController');
//const authMiddleware = require('../middleware/Middleware');

const UserController = require('../controller/UserController');

router.post('/signup', UserController.signup);
router.post('/login', UserController.login);

module.exports = router;