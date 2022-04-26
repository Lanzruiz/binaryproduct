const express = require('express')
require('dotenv').config()
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');


const UserCtrl = require('../controllers/users-ctrl')
const AuthCtrl = require('../controllers/auth-ctrl')
const jwt = require('jsonwebtoken')


const router = express.Router()


// router.post('/create', UserCtrl.createUsers)
router.get('/:id', UserCtrl.getUserById)
router.post('/signup', UserCtrl.signUp)
router.post('/login', AuthCtrl.login)
router.post('/token', AuthCtrl.token)

module.exports = router