const mongoose = require('mongoose');
const Product = require('../models/Product');

require('dotenv').config({ path: '../.env' });

// console.log(process.env.DATABASE_URL); Ensure the environment variable is set
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
        image: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fhiyest.com%2Foversized-t-shirts%2Fembrace-change-oversized-black-t-shirt%2F%3Fsrsltid%3DAfmBOopFMA0yIRY913VWfdcnMwexM_XWiB5IiWjgsXl7HOJQpaF_lN0g&psig=AOvVaw0OesF4cJUdmrDjJAbXJCCT&ust=1752808668974000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCJiD36L3wo4DFQAAAAAdAAAAABAE"
      },
      {
        name: "Basic Black Tee",
        price: 499,
        description: "Comfortable black cotton t-shirt",
        stock: 15,
        image: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fhiyest.com%2Foversized-t-shirts%2Fembrace-change-oversized-black-t-shirt%2F%3Fsrsltid%3DAfmBOopFMA0yIRY913VWfdcnMwexM_XWiB5IiWjgsXl7HOJQpaF_lN0g&psig=AOvVaw0OesF4cJUdmrDjJAbXJCCT&ust=1752808668974000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCJiD36L3wo4DFQAAAAAdAAAAABAE"
      },
      {
        name: "Graphic Print Tee",
        price: 699,
        description: "Trendy graphic print on a soft fabric",
        stock: 8,
        image: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fhiyest.com%2Foversized-t-shirts%2Fembrace-change-oversized-black-t-shirt%2F%3Fsrsltid%3DAfmBOopFMA0yIRY913VWfdcnMwexM_XWiB5IiWjgsXl7HOJQpaF_lN0g&psig=AOvVaw0OesF4cJUdmrDjJAbXJCCT&ust=1752808668974000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCJiD36L3wo4DFQAAAAAdAAAAABAE"
      },
      {
        name: "Striped Blue Tee",
        price: 599,
        description: "Blue stripes with a modern fit",
        stock: 12,
        image: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fhiyest.com%2Foversized-t-shirts%2Fembrace-change-oversized-black-t-shirt%2F%3Fsrsltid%3DAfmBOopFMA0yIRY913VWfdcnMwexM_XWiB5IiWjgsXl7HOJQpaF_lN0g&psig=AOvVaw0OesF4cJUdmrDjJAbXJCCT&ust=1752808668974000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCJiD36L3wo4DFQAAAAAdAAAAABAE"
      },
      {
        name: "V-neck Grey Tee",
        price: 549,
        description: "V-neck grey cotton blend t-shirt",
        stock: 9,
        image: "/images/vneck-grey-tee.jpg"
      },
      {
        name: "Round-neck Red Tee",
        price: 499,
        description: "Casual red round-neck t-shirt",
        stock: 7,
        image: "/images/red-tee.jpg"
      },
      {
        name: "Oversized White Tee",
        price: 799,
        description: "Oversized fit for a relaxed look",
        stock: 5,
        image: "/images/oversized-white-tee.jpg"
      },
      {
        name: "Polo Navy Tee",
        price: 899,
        description: "Classic navy polo t-shirt",
        stock: 14,
        image: "/images/polo-navy-tee.jpg"
      },
      {
        name: "Henley Olive Tee",
        price: 749,
        description: "Olive green Henley neck with buttons",
        stock: 6,
        image: "/images/henley-olive-tee.jpg"
      },
      {
        name: "Sleeveless Black Tee",
        price: 399,
        description: "Perfect for gym and workouts",
        stock: 10,
        image: "/images/sleeveless-black-tee.jpg"
      },
      {
        name: "Tie-dye Tee",
        price: 699,
        description: "Trendy tie-dye pattern",
        stock: 8,
        image: "/images/tie-dye-tee.jpg"
      },
      {
        name: "Long Sleeve White Tee",
        price: 699,
        description: "Full sleeve, soft cotton white t-shirt",
        stock: 11,
        image: "/images/long-sleeve-white-tee.jpg"
      },
      {
        name: "Cropped Black Tee",
        price: 599,
        description: "Cropped style, modern fit",
        stock: 4,
        image: "/images/cropped-black-tee.jpg"
      },
      {
        name: "Printed Yellow Tee",
        price: 649,
        description: "Bright yellow with cool print",
        stock: 7,
        image: "/images/printed-yellow-tee.jpg"
      },
      {
        name: "Slim-fit Grey Tee",
        price: 549,
        description: "Slim fit for a sharp look",
        stock: 9,
        image: "/images/slim-fit-grey-tee.jpg"
      },
      {
        name: "Raglan Sleeve Tee",
        price: 599,
        description: "Contrast sleeves, sporty design",
        stock: 6,
        image: "/images/raglan-tee.jpg"
      },
      {
        name: "Pocket White Tee",
        price: 549,
        description: "White t-shirt with chest pocket",
        stock: 8,
        image: "/images/pocket-white-tee.jpg"
      },
      {
        name: "Organic Cotton Tee",
        price: 799,
        description: "Made from 100% organic cotton",
        stock: 5,
        image: "/images/organic-cotton-tee.jpg"
      },
      {
        name: "Bold Logo Tee",
        price: 699,
        description: "Statement logo print on chest",
        stock: 7,
        image: "/images/bold-logo-tee.jpg"
      },
      {
        name: "Retro Striped Tee",
        price: 649,
        description: "Vintage stripes, retro vibe",
        stock: 6,
        image: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fhiyest.com%2Foversized-t-shirts%2Fembrace-change-oversized-black-t-shirt%2F%3Fsrsltid%3DAfmBOopFMA0yIRY913VWfdcnMwexM_XWiB5IiWjgsXl7HOJQpaF_lN0g&psig=AOvVaw0OesF4cJUdmrDjJAbXJCCT&ust=1752808668974000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCJiD36L3wo4DFQAAAAAdAAAAABAE"
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
