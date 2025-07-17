const express=require('express');
const app=express();
const mongoose = require('./config/db'); // Import the database configuration
const cors = require('cors'); // Import CORS middleware
require('dotenv').config(); // Load environment variables from .env file

app.use(express.json()); // Middleware to parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded bodies
app.use(cors()); // Enable CORS for all routes

const authRoute = require('./routes/authRoute');
const productRoute = require('./routes/productRoute');
const orderRoute = require('./routes/orderRoute');


app.get('/',(req,res)=>{
    res.send('Hello World');
});


app.use('/auth',authRoute)
app.use('/products', productRoute);
app.use('/orders', orderRoute);


app.listen(process.env.PORT || 3000,()=>{
    console.log(`Server is running on port ${process.env.PORT || 3000}`);
});
