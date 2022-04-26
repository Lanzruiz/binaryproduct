const express = require('express')
require('dotenv').config()


const UserCtrl = require('../controllers/users-ctrl')
const AuthCtrl = require('../controllers/auth-ctrl')
const productCtrl = require('../controllers/product-ctrl')
// const VicesCtrl = require('../controllers/vices-ctrl')
// const SkillsCtrl = require('../controllers/skills-ctrl')
const jwt = require('jsonwebtoken')

const router = express.Router()

router.post('/', productCtrl.createProduct)
router.get('/all/', productCtrl.getAllProduct)
router.get('/:productId', productCtrl.getProductById)
router.delete('/', productCtrl.deleteProductById)
router.put('/', productCtrl.updateProductById)


module.exports = router