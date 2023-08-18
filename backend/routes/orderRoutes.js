const express = require('express');
const { createOrder } = require('../controllers/orderController');
const {verifyIsLoggedIn} =require("../middleware/verifyAuthToken")
const router = express.Router();

router.route('/order/:userId/newOrder').post(verifyIsLoggedIn,createOrder );


module.exports = router;