const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Order = new Schema(
    {
        productName: { type: String, required: true },
        productId: { type: String, required: true},
        userId: { type: String, required: true },
        email: { type: String, required: true},
        firstName: { type: String, required: true},
        lastName: { type: String, required: true},
        status: { type: Number, default: 0},
        quantity: { type: Number, required: true },
        
    },
    { timestamps: true },
)

module.exports = mongoose.model('order', Order)