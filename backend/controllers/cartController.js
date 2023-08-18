const Cart=require("../models/cartModel")
const Product=require("../models/productModel")
const User=require("../models/userModel")

exports.createCart = async(req,res)=>{
    try {
        const { userId, productId, quantity } = req.body;
    
        // Check if the product exists
        const product = await Product.findById(productId);
        if (!product) {
          return res.status(404).json({ message: 'Product not found' });
        }
    
        // Find or create a cart for the user
        let cart = await Cart.findOne({ userId });
        if (!cart) {
          cart = new Cart({ userId, items: [] });
        }
    
        // Check if the item is already in the cart
        const existingItem = cart.items.find(item => item.productId === productId);
        if (existingItem) {
          //existingItem.quantity += quantity;
          quantity += existingItem.quantity
        } else {
          cart.items.push({ productId, quantity });
        }
    
        // Save the cart
        await cart.save();
    
        res.status(201).json({ message: 'Item added to cart', cart });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
      }
}


exports.getUserCart = async(req,res)=>{
    try {
        const { userId } = req.params;
    
        // Check if the user exists
        const user = await User.findById(userId);
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
    
        // Find the user's cart
        const cart = await Cart.findOne({ userId }).populate('items.productId');
        if (!cart) {
          return res.status(404).json({ message: 'Cart not found' });
        }
    
        res.status(200).json({ cart });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
      }
}

exports.updateCartItemQuantity = async(req,res)=>{
    try {
        const { userId, itemId } = req.params;
        const { newQuantity } = req.body;
    
        // Check if the user exists
        const user = await User.findById(userId);
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
    
        // Find the user's cart
        const cart = await Cart.findOne({ userId });
        if (!cart) {
          return res.status(404).json({ message: 'Cart not found' });
        }
    
        // Find the index of the item in the cart items array
        const itemIndex = cart.items.findIndex(item => item.productId.toString() === itemId);
        if (itemIndex === -1) {
          return res.status(404).json({ message: 'Item not found in cart' });
        }
    
        // Update the item's quantity
        cart.items[itemIndex].quantity = newQuantity;
    
        // Save the updated cart
        await cart.save();
    
        res.status(200).json({ message: 'Item quantity updated', cart });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
      }
}

exports.deleteCartItem = async(req,res) =>{
    try {
        const { userId, itemId } = req.params;
    
        // Check if the user exists
        const user = await User.findById(userId);
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
    
        // Find the user's cart
        const cart = await Cart.findOne({ userId });
        if (!cart) {
          return res.status(404).json({ message: 'Cart not found' });
        }
    
        // Find the index of the item in the cart items array
        const itemIndex = cart.items.findIndex(item => item.productId.toString() === itemId);
        if (itemIndex === -1) {
          return res.status(404).json({ message: 'Item not found in cart' });
        }
    
        // Remove the item from the cart's items array
        cart.items.splice(itemIndex, 1);
    
        // Save the updated cart
        await cart.save();
    
        res.status(200).json({ message: 'Item removed from cart', cart });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
      }
}