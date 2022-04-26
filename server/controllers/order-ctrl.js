const Order = require('../models/order-model')
const bcrypt = require("bcrypt");
const mongoose = require('mongoose')
require('dotenv').config()

createOrder = (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a order',
        })
    }

    const order = new Order(body)

    if (!order) {
        return res.status(400).json({ success: false, error: err })
    }

    order
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: order._id,
                message: 'Order created!',

            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Order not created!',
            })
        })
}

getAllOrder = async (req, res) => {

    await Order.find((err, order) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!order.length) {
            return res
                .status(404)
                .json({ success: false, error: `Order is empty` })
        }
        return res.status(200).json({ success: true, data: order })
    }).catch(err => console.log(err))
}

deleteOrderById = async (req, res) => {
    const orderId = req.body.orderId
    await Order.findOneAndDelete({ _id: orderId }, (err, order) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!order) {
            return res
                .status(404)
                .json({ success: false, error: `Order not found` })
        }

        return res.status(200).json({ success: true, message: "Order has been deleted!" })
    }).catch(err => console.log(err))
}


updateOrderById = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    const orderData = {

        productName: req.body.productName,
        productId: req.body.productId,
        userId: req.body.userId,
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        status: req.body.status,
        quantity: req.body.quantity,
    }
    
    Order.updateOne({_id: req.body.orderId}, orderData).then(

        () => {
          res.status(201).json({
            message: 'Order updated successfully!'
          });
        }
      ).catch(

        (error) => {
            res.status(400).json({
              error: error
            });
          }
      );

}


getOrderById = async (req, res) => {

    await Order.findOne({ _id: req.params.orderId }, (err, order) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!order) {
            return res
                .status(404)
                .json({ success: false, error: `Order not found` })
        }
        const orderData = {

            productName: order.productName,
            productId: order.productId,
            userId: order.userId,
            email: order.email,
            firstName: order.firstName,
            lastName: order.lastName,
            status: order.status,
            quantity: order.quantity,
        }

        return res.status(200).json({ success: true, data: orderData })
    }).catch(err => console.log(err))
}


module.exports = {
    createOrder,
    getAllOrder,
    updateOrderById,
    getOrderById
  
}