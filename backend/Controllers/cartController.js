const Cart = require('../models/Cart');

// 📦 Add or Update product in cart
exports.addToCart = async (req, res) => {
  // console.log("Increment or decrement or add to cart request received");
  const userId = req.user.userId;
  const { productId, quantity } = req.body;
  // console.log('Adding to cart:', { userId, productId, quantity });

  if (!productId || !quantity || quantity < 1) {
    return res.status(400).json({ message: 'Invalid product or quantity' });
  }

  try {
    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = new Cart({
        user: userId,
        items: [{ productId, qty: quantity }],
      });
    } else {
      const itemIndex = cart.items.findIndex(
        (item) => item.productId.toString() === productId
      );

      if (itemIndex > -1) {
        cart.items[itemIndex].qty = quantity; // update qty
      } else {
        cart.items.push({ productId, qty: quantity }); // add new item
      }
    }

    await cart.save();

    const populatedCart = await Cart.findOne({ user: userId })
      .populate('items.productId', 'name price image');

    res.json(populatedCart);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// 📝 Get user cart
exports.getCart = async (req, res) => {
  const userId = req.user.userId;

  try {
    const cart = await Cart.findOne({ user: userId })
      .populate('items.productId', 'name price image');

    if (!cart) {
      return res.json({ user: userId, items: [] });
    }

    res.json(cart);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// ❌ Remove product from cart
exports.removeFromCart = async (req, res) => {
  const userId = req.user.userId;
  const { productId } = req.params;

  try {
    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    cart.items = cart.items.filter(
      (item) => item.productId.toString() !== productId
    );

    await cart.save();

    const populatedCart = await Cart.findOne({ user: userId })
      .populate('items.productId', 'name price image');

    res.json(populatedCart);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// 🔄 Clear cart
exports.clearCart = async (req, res) => {
  const userId = req.user.userId;

  try {
    await Cart.findOneAndDelete({ user: userId });
    res.json({ message: 'Cart cleared' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};
