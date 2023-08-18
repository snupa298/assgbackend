const Cart=require("../models/cartModel")
const Order=require("../models/orderModel")
const User=require("../models/userModel")
const Product=require("../models/productModel")


async function calculateCartTotal(cart) {
  let totalAmount = 0;

  for (const item of cart.items) {
    const product = await Product.findById(item.productId);
    if (product) {
      totalAmount += product.price * item.quantity;
    }
  }

  return totalAmount;
}

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
    
 // Calculate the total amount
 const totalAmount = await calculateCartTotal(cart);

        // Create a new order
        const order = new Order({
          user,
          cartItems: cart.items.map(item => ({
            productId: item.productId,
            quantity: item.quantity,
          })),
         
         totalAmount
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


exports.myOrders = async (req, res) => {
  try{
    const orders = await Order.find({ user: req.user._id })
    

    res.status(200).json({
        success: true,
        orders
    })
  }
  catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
}


exports.getSingleOrder = async (req, res) => {
  try{
    const order = await Order.findById(req.params.id)

    if (!order) {
      res.status(404).json({ message: 'No order is found' });
    }
  
    res.status(200).json({
        success: true,
        order
    })
  }
  catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
}

exports.deleteOrder = async(req,res) =>{
  try{
const order = await Order.findById(req.params.id).orFail()

await order.deleteOne()
res.send("Order removed")
  }
  catch(err){
    res.status(500).json({ message: 'Internal server error' });
  }
}