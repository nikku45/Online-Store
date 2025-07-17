const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
          required: true
        },
        qty: {
          type: Number,
          required: true,
          min: 1
        }
      }
    ],

    total: {
      type: Number,
      required: true
    },

    status: {
      type: String,
      enum: ['Confirmed', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
      default: 'Confirmed'
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null
    }
  },
  { timestamps: true } // adds createdAt & updatedAt
);

module.exports = mongoose.model('Order', orderSchema);
