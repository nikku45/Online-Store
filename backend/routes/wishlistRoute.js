const express = require('express');
const router = express.Router();
const {getWishlist,addToWishlist,removeFromWishlist} = require('../Controllers/wishlistController');
const {protect} = require('../Middleware/authMiddleware');


router.get('/',protect,getWishlist);


router.post('/', protect, addToWishlist);


router.delete('/:productId', protect, removeFromWishlist);

module.exports = router;
