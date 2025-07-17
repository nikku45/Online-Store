const express = require('express');
const { placeOrder, getUserOrders } = require('../Controllers/orderController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', protect, placeOrder);
router.get('/myorders', protect, getUserOrders);

module.exports = router;
