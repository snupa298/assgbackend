const express = require('express');
const { createOrder, myOrders, getSingleOrder, deleteOrder, } = require('../controllers/orderController');
const {verifyIsLoggedIn} =require("../middleware/verifyAuthToken")
const router = express.Router();

router.route('/order/:userId/newOrder').post(verifyIsLoggedIn,createOrder );
router.route('/order/me').get(verifyIsLoggedIn, myOrders);
router.route('/order/:id').get(verifyIsLoggedIn, getSingleOrder);
router.route('/order/:id').delete(verifyIsLoggedIn,deleteOrder );

module.exports = router;