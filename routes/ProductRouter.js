const express = require('express');
const router = express.Router();
//const { createorder, findallorders } = require('../controller/OrderController');
//const authMiddleware = require('../middleware/Middleware');

const productController = require('../controller/ProductController');
const middleware = require('../middleware/Middleware');

router.post('/create', middleware, productController.createProduct);
router.put('/update/:id', productController.updateProduct);
router.delete('/delete', productController.deleteProduct);
router.get('/find-by-id/:id', productController.findProduct);
router.get('/load-all', productController.loadAllProducts);

module.exports = router;