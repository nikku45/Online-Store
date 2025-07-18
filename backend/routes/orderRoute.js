const express = require('express');
const { placeOrder, getUserOrders ,getOrderById} = require('../Controllers/orderController');
const { protect } = require('../Middleware/authMiddleware');
const router = express.Router();

router.post('/', protect, placeOrder);
router.get('/myorders', protect, getUserOrders);
router.get('/:orderId', protect, getOrderById);



module.exports = router;
