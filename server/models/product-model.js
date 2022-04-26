const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Product = new Schema(
    {
        productName: { type: String, required: true },
        productDescription: { type: String, required: true },
        quantity:{ type: Number, required: true },
        
    },
    { timestamps: true },
)

module.exports = mongoose.model('product', Product)