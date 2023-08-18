const express = require('express');
const { createCart, getUserCart, updateCartItemQuantity, deleteCartItem } = require('../controllers/cartController');
const {verifyIsLoggedIn} =require("../middleware/verifyAuthToken")
const router = express.Router();

router.route('/cart/new').post(verifyIsLoggedIn, createCart);
router.route('/cart/user/:userId').get(verifyIsLoggedIn,getUserCart)
router.route('/cart/:userId/:itemId').put(verifyIsLoggedIn,updateCartItemQuantity)
router.route('/cart/:userId/:itemId').delete(verifyIsLoggedIn,deleteCartItem)

module.exports = router;