const mongoose = require('mongoose');
const Product = require('../models/Product');

require('dotenv').config({ path: '../.env' });
mongoose.connect(process.env.DATABASE_URL)
  .then(() => {
    console.log('MongoDB connected');
    return Product.deleteMany({});
  })
  .then(() => {
    return Product.insertMany([
      {
      name: "Basic White Tee",
      price: 499,
      description: "Soft cotton white t-shirt",
      stock: 10,
      image: "https://nobero.com/cdn/shop/files/black_0e2aa2a6-e8e0-48e7-a5a3-0bf41d64f723.jpg?v=1744009109"
      },
      {
      name: "Basic Black Tee",
      price: 499,
      description: "Comfortable black cotton t-shirt",
      stock: 15,
      image: "https://nobero.com/cdn/shop/files/black_0e2aa2a6-e8e0-48e7-a5a3-0bf41d64f723.jpg?v=1744009109"
      },
      {
      name: "Graphic Print Tee",
      price: 699,
      description: "Trendy graphic print on a soft fabric",
      stock: 8,
      image: "https://nobero.com/cdn/shop/files/black_0e2aa2a6-e8e0-48e7-a5a3-0bf41d64f723.jpg?v=1744009109"
      },
      {
      name: "Striped Blue Tee",
      price: 599,
      description: "Blue stripes with a modern fit",
      stock: 12,
      image: "https://nobero.com/cdn/shop/files/black_0e2aa2a6-e8e0-48e7-a5a3-0bf41d64f723.jpg?v=1744009109"
      },
      {
      name: "V-neck Grey Tee",
      price: 549,
      description: "V-neck grey cotton blend t-shirt",
      stock: 9,
      image: "https://nobero.com/cdn/shop/files/black_0e2aa2a6-e8e0-48e7-a5a3-0bf41d64f723.jpg?v=1744009109"
      },
      {
      name: "Round-neck Red Tee",
      price: 499,
      description: "Casual red round-neck t-shirt",
      stock: 7,
      image: "https://nobero.com/cdn/shop/files/black_0e2aa2a6-e8e0-48e7-a5a3-0bf41d64f723.jpg?v=1744009109"
      },
      {
      name: "Oversized White Tee",
      price: 799,
      description: "Oversized fit for a relaxed look",
      stock: 5,
      image: "https://nobero.com/cdn/shop/files/black_0e2aa2a6-e8e0-48e7-a5a3-0bf41d64f723.jpg?v=1744009109"
      },
      {
      name: "Polo Navy Tee",
      price: 899,
      description: "Classic navy polo t-shirt",
      stock: 14,
      image: "https://nobero.com/cdn/shop/files/black_0e2aa2a6-e8e0-48e7-a5a3-0bf41d64f723.jpg?v=1744009109"
      },
      {
      name: "Henley Olive Tee",
      price: 749,
      description: "Olive green Henley neck with buttons",
      stock: 6,
      image: "https://nobero.com/cdn/shop/files/black_0e2aa2a6-e8e0-48e7-a5a3-0bf41d64f723.jpg?v=1744009109"
      },
      {
      name: "Sleeveless Black Tee",
      price: 399,
      description: "Perfect for gym and workouts",
      stock: 10,
      image: "https://nobero.com/cdn/shop/files/black_0e2aa2a6-e8e0-48e7-a5a3-0bf41d64f723.jpg?v=1744009109"
      },
      {
      name: "Tie-dye Tee",
      price: 699,
      description: "Trendy tie-dye pattern",
      stock: 8,
      image: "https://nobero.com/cdn/shop/files/black_0e2aa2a6-e8e0-48e7-a5a3-0bf41d64f723.jpg?v=1744009109"
      },
      {
      name: "Long Sleeve White Tee",
      price: 699,
      description: "Full sleeve, soft cotton white t-shirt",
      stock: 11,
      image: "https://nobero.com/cdn/shop/files/black_0e2aa2a6-e8e0-48e7-a5a3-0bf41d64f723.jpg?v=1744009109"
      },
      {
      name: "Cropped Black Tee",
      price: 599,
      description: "Cropped style, modern fit",
      stock: 4,
      image: "https://nobero.com/cdn/shop/files/black_0e2aa2a6-e8e0-48e7-a5a3-0bf41d64f723.jpg?v=1744009109"
      },
      {
      name: "Printed Yellow Tee",
      price: 649,
      description: "Bright yellow with cool print",
      stock: 7,
      image: "https://nobero.com/cdn/shop/files/black_0e2aa2a6-e8e0-48e7-a5a3-0bf41d64f723.jpg?v=1744009109"
      },
      {
      name: "Slim-fit Grey Tee",
      price: 549,
      description: "Slim fit for a sharp look",
      stock: 9,
      image: "https://nobero.com/cdn/shop/files/black_0e2aa2a6-e8e0-48e7-a5a3-0bf41d64f723.jpg?v=1744009109"
      },
      {
      name: "Raglan Sleeve Tee",
      price: 599,
      description: "Contrast sleeves, sporty design",
      stock: 6,
      image: "https://nobero.com/cdn/shop/files/black_0e2aa2a6-e8e0-48e7-a5a3-0bf41d64f723.jpg?v=1744009109"
      },
      {
      name: "Pocket White Tee",
      price: 549,
      description: "White t-shirt with chest pocket",
      stock: 8,
      image: "https://nobero.com/cdn/shop/files/black_0e2aa2a6-e8e0-48e7-a5a3-0bf41d64f723.jpg?v=1744009109"
      },
      {
      name: "Organic Cotton Tee",
      price: 799,
      description: "Made from 100% organic cotton",
      stock: 5,
      image: "https://nobero.com/cdn/shop/files/black_0e2aa2a6-e8e0-48e7-a5a3-0bf41d64f723.jpg?v=1744009109"
      },
      {
      name: "Bold Logo Tee",
      price: 699,
      description: "Statement logo print on chest",
      stock: 7,
      image: "https://nobero.com/cdn/shop/files/black_0e2aa2a6-e8e0-48e7-a5a3-0bf41d64f723.jpg?v=1744009109"
      },
      {
      name: "Retro Striped Tee",
      price: 649,
      description: "Vintage stripes, retro vibe",
      stock: 6,
      image: "https://nobero.com/cdn/shop/files/black_0e2aa2a6-e8e0-48e7-a5a3-0bf41d64f723.jpg?v=1744009109"
      }
    ]);
  })
  .then(() => {
    console.log('Products seeded');
    mongoose.connection.close();
  })
  .catch(err => {
    console.error(err);
  });
