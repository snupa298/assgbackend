const mongoose = require("mongoose")
const User = require("./userModel")
const Cart=require("./cartModel")

const orderSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: User,
    },
    orderTotal: {
        type:Number
        // itemsCount: {type: Number, required: true},
        // cartSubtotal: {type: Number, required: true}
    },
    cartItems: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: Cart,
    }
}, {
    timestamps: true,
})

const Order = mongoose.model("Order", orderSchema)
module.exports = Order