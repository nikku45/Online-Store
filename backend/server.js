const express=require('express');
const app=express();
const mongoose = require('./config/db'); // Import the database configuration
const cors = require('cors'); // Import CORS middleware
require('dotenv').config(); // Load environment variables from .env file

app.use(express.json()); // Middleware to parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded bodies
app.use(cors(
    {
        origin: process.env.CLIENT_URL || 'http://localhost:5173', // Allow requests from the frontend
        credentials: true, // Allow credentials (cookies, authorization headers, etc.)
    }
))

const authRoute = require('./routes/authRoute');
const productRoute = require('./routes/productRoute');
const orderRoute = require('./routes/orderRoute');
const cartRoute = require('./routes/cartRoutes'); // Import cart routes


app.get('/',(req,res)=>{
    res.send('Hello World');
});


app.use('/auth',authRoute)
app.use('/products', productRoute);
app.use('/orders', orderRoute);
app.use('/cart', cartRoute); // Import and use cart routes


app.listen(process.env.PORT || 3000,()=>{
    console.log(`Server is running on port ${process.env.PORT || 3000}`);
});
