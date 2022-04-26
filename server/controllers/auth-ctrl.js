const AuthServices = require('../services/auth')
const UserService = require('../services/user-services')
const jwt = require('jsonwebtoken')
const User = require('../models/users-model')
const mongoose = require('mongoose')
const bcrypt = require("bcrypt");
require('dotenv').config()


login = async (req, res) => {

    const email = req.body.email
    const password = req.body.password
    const user = { name: email, password }
    const salt = await bcrypt.genSalt(10);

    const userResult = await User.findOne({ email: req.body.email });

    if (userResult) {
      // check user password with hashed password stored in the database
      const validPassword = await bcrypt.compare(password, userResult.password);
      if (validPassword) {
        const accessToken = AuthServices.generateAccessToken(user)
        const refreshTokenResult = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
        // console.log('user result', userResult._id);
        return res.status(200).json({ status: "success", user_id: userResult._id, accessToken: accessToken, refreshToken: refreshTokenResult})

      } else {
        return res.status(400).json({ error: "Invalid Password" });
      }
    } else {
      return res.status(401).json({ error: "User does not exist" });
    }
}

token = async (req, res) => {
  const refreshToken = req.body.refreshToken
  // if (refreshToken == null) return res.sendStatus(401)
  // if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403)
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403)
    const accessToken = AuthServices.generateAccessToken({ name: user.name})
    res.json({ accessToken: accessToken })
  })
}

mobileSignGoogle = async (req, res) => {
  const body = req.body
  const email = req.body.email
  const user = { email: email }

  const userResult = await User.findOne({ email: req.body.email });

  if (userResult) {
    // check user password with hashed password stored in the database
  
      const accessToken = AuthServices.generateAccessToken(user)
      const refreshTokenResult = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
      return res.status(200).json({ status: "success", accessToken: accessToken, refreshToken: refreshTokenResult})

    
  } else {

    UserService.googleSignUp(body)
    const accessToken = AuthServices.generateAccessToken(user)

    const refreshTokenResult = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
    return res.status(200).json({ status: "success", accessToken: accessToken, refreshToken: refreshTokenResult})
    // return res.status(401).json({ error: "User does not exist" });
  }
}

mobileSignFacebook = async (req, res) => {
  const body = req.body
  const email = req.body.email
  const user = { email: email }

  const userResult = await User.findOne({ email: req.body.email });

  if (userResult) {
    // check user password with hashed password stored in the database
  
      const accessToken = AuthServices.generateAccessToken(user)
      const refreshTokenResult = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
      return res.status(200).json({ status: "success", accessToken: accessToken, refreshToken: refreshTokenResult})

    
  } else {

    UserService.facebookSignUp(body)
    const accessToken = AuthServices.generateAccessToken(user)

    const refreshTokenResult = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
    return res.status(200).json({ status: "success", accessToken: accessToken, refreshToken: refreshTokenResult})
    // return res.status(401).json({ error: "User does not exist" });
  }
}  

createJwt = async (req, res) => {

    const email = req.body.email
    const user = { email: email }

    const userResult = await User.findOne({ email: req.body.email });

    if (userResult) {
      // check user password with hashed password stored in the database
    
        const accessToken = AuthServices.generateAccessToken(user)
        const refreshTokenResult = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
        return res.status(200).json({ status: "success", accessToken: accessToken, refreshToken: refreshTokenResult})

      
    } else {
      return res.status(401).json({ error: "User does not exist" });
    }
}

authenticateToken = (req, res, next) => {
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

module.exports = {
   login,
   authenticateToken,
   mobileSignGoogle,
   mobileSignFacebook,
   createJwt,
   token,
}