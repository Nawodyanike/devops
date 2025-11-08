const express = require('express');
const router = express.Router();
//const { createorder, findallorders } = require('../controller/OrderController');
//const authMiddleware = require('../middleware/Middleware');

const CustomerController = require('../controller/CustomerController');
const middleware = require('../middleware/Middleware');

router.post('/create', middleware,CustomerController.createCustomer);
router.put('/update/:id', CustomerController.updatecustomer);
router.delete('/delete', CustomerController.deletecustomer);
router.get('/find-by-id/:id', CustomerController.findcustomer);
router.get('/load-all', CustomerController.loadallcustomers);

module.exports = router;