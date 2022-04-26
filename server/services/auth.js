require('dotenv').config()
const jwt = require('jsonwebtoken')

generateAccessToken = (user) => {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' })
}

authenticateTokenJwt = (token) => {

    if (token == null) return 401
  
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      console.log(err)
      if (err) return 403
      return next()
    })
}

module.exports = {
    generateAccessToken,
    authenticateTokenJwt
}