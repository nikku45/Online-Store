const express = require('express');
const {
  addToCart,
  getCart,
  removeFromCart,
  clearCart
} = require('../Controllers/cartController');
const { protect } = require('../Middleware/authMiddleware');
const router = express.Router();

router.post('/', protect,addToCart);
router.get('/', protect, getCart);
router.delete('/:productId', protect, removeFromCart);
router.delete('/', protect, clearCart);

module.exports = router;
