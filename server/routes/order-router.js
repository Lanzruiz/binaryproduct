const express = require('express')
require('dotenv').config()


const UserCtrl = require('../controllers/users-ctrl')
const AuthCtrl = require('../controllers/auth-ctrl')
const orderCtrl = require('../controllers/order-ctrl')
// const VicesCtrl = require('../controllers/vices-ctrl')
// const SkillsCtrl = require('../controllers/skills-ctrl')
const jwt = require('jsonwebtoken')

const router = express.Router()

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      console.log(err)
      if (err) return res.sendStatus(403)
      req.user = user
      next()
    })
}


router.post('/', orderCtrl.createOrder)
router.get('/all/', orderCtrl.getAllOrder)
router.put('/', orderCtrl.updateOrderById)
router.get('/:orderId', orderCtrl.getOrderById)
// router.delete('/', productCtrl.deleteProductById)
// router.put('/', productCtrl.updateProductById)


module.exports = router