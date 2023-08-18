const Cart=require("../models/cartModel")
const Order=require("../models/orderModel")
const User=require("../models/userModel")

exports.createOrder = async (req,res) =>{
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
    
        // Create a new order
        const order = new Order({
          user,
          cartItems: cart.items.map(item => ({
            productId: item.productId,
            quantity: item.quantity,
          })),
          orderTotal: 0, // Calculate the total amount based on items in the real scenario
        });
    
        // Save the order
        await order.save();
    
        // Clear the user's cart
        cart.items = [];
        await cart.save();
    
        res.status(201).json({ message: 'Order created', order });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
      }
}