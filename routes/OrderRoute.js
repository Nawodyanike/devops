const express = require('express');
const router = express.Router();
//const { createorder, findallorders } = require('../controller/OrderController');
//const authMiddleware = require('../middleware/Middleware');

const OrderController = require('../controller/OrderController');
const middleware = require('../middleware/Middleware');

router.post('/create', middleware, OrderController.createorder);
router.get('/find-all', OrderController.findallorders);
//router.post('/delete', OrderController.deleteOrder);
module.exports = router;