const express = require('express');
const app = express();

const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const dotenv = require('dotenv');


// const errorMiddleware = require('./middlewares/errors')

// Setting up config file 
 dotenv.config({ path: 'config/config.env' })

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser())



// Import all routes
const category=require("./routes/categoryRoutes")
 const products = require('./routes/productRoutes');
 const user = require('./routes/userRoutes');
 const cart=require("./routes/cartRoutes")
const order = require('./routes/orderRoutes');

app.use("/api",category)
app.use('/api', products)
app.use('/api', user)
app.use("/api",cart)
app.use('/api', order)


module.exports = app