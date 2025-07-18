const express=require('express');
const app=express();
const mongoose = require('./config/db'); 
const cors = require('cors'); 
require('dotenv').config(); 

app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 
app.use(cors(
    {
        origin: process.env.CLIENT_URL , 
        credentials: true, 
    }
))

const authRoute = require('./routes/authRoute');
const productRoute = require('./routes/productRoute');
const orderRoute = require('./routes/orderRoute');
const cartRoute = require('./routes/cartRoutes'); 


app.get('/',(req,res)=>{
    res.send('Hello World');
});


app.use('/auth',authRoute)
app.use('/products', productRoute);
app.use('/orders', orderRoute);
app.use('/cart', cartRoute); 


app.listen(process.env.PORT || 3000,()=>{
    console.log(`Server is running on port ${process.env.PORT || 3000}`);
});
