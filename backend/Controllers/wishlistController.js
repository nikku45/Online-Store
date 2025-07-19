const Wishlist = require('../models/Wishlist');
const Product = require('../models/Product');


exports.getWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({ user: req.user.userId }).populate('products');
    if (!wishlist) {
      return res.json({ products: [] });
    }
    res.json(wishlist);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};


exports.addToWishlist = async (req, res) => {
    // console.log('Adding to wishlist:', req.body);
    // console.log('User ID:', req.user.userId);
  const { productId } = req.body;
  if (!productId) {
    return res.status(400).json({ message: 'Product ID is required' });
  }

  try {
    let wishlist = await Wishlist.findOne({ user: req.user.userId});
    if (!wishlist) {
      wishlist = new Wishlist({ user: req.user.userId, products: [productId] });
    } else {
      if (wishlist.products.includes(productId)) {
        return res.status(400).json({ message: 'Product already in wishlist' });
      }
      wishlist.products.push(productId);
    }

    await wishlist.save();
    await wishlist.populate('products');

    res.json(wishlist);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};


exports.removeFromWishlist = async (req, res) => {
  const { productId } = req.params;

  try {
    const wishlist = await Wishlist.findOne({ user: req.user.userId });
    if (!wishlist) {
      return res.status(404).json({ message: 'Wishlist not found' });
    }

    wishlist.products = wishlist.products.filter(
      (p) => p.toString() !== productId
    );

    await wishlist.save();
    await wishlist.populate('products');

    res.json(wishlist);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
