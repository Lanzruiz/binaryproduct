const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const cookieSession = require('cookie-session');
const passport = require('passport');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');
require('./services/passport');

const db = require('./db')
const userRouter = require('./routes/users-router')
const productRouter = require('./routes/product-router')
const orderRouter = require('./routes/order-router')

const app = express()
const apiPort = 5000


app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(bodyParser.json())


const swaggerOptions = {
    swaggerDefinition: {
      info: {
        title: "Binary Product API",
        version: '1.0.2',
      },
    },
    apis: ["index.js"],
  };

  const swaggerDocs = swaggerJsDoc(swaggerOptions);
  app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));
  
  

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.get('/', (req, res) => {
    res.send('Hello World!')
})

/**
 * @swagger
 * /user/signup:
*   post:
*      description: Used to register user
*      tags:
*          - User
*      parameters:
*          - in: body
*            name: User
*            description: User data
*            schema:
*              type: object
*              required:
*                 - firstName
*                 - lastName
*                 - email
*                 - password
*              properties:
*                  firstName:
*                      type: string
*                      minLength: 1
*                      maxLength: 45
*                      example: Lanz
*                  lastName:
*                      type: string
*                      minLength: 1
*                      maxLength: 45
*                      example: Ruiz
*                  email:
*                      type: string
*                      minLength: 1
*                      maxLength: 100
*                      example: Lanzruiz101@gmail.com
*                  password:
*                      type: string
*                      minLength: 1
*                      maxLength: 45
*                      example: abcd
*      responses:
*          '200':
*              description: Resource added successfully
*          '500':
*              description: Internal server error
*          '400':
*              description: Bad request
*/


/**
 * @swagger
 * /user/login:
*   post:
*      description: Used to login user
*      tags:
*          - User
*      parameters:
*          - in: body
*            name: User
*            description: User data
*            schema:
*              type: object
*              required:
*                 - email
*                 - password
*              properties:
*                  email:
*                      type: string
*                      minLength: 1
*                      maxLength: 100
*                      example: Lanzruiz101@gmail.com
*                  password:
*                      type: string
*                      minLength: 1
*                      maxLength: 45
*                      example: abcd
*      responses:
*          '200':
*              description: Resource added successfully
*          '500':
*              description: Internal server error
*          '400':
*              description: Bad request
*/

/**
 * @swagger
 * /user/{id}:
*   get:
*      description: Find the user information
*      tags:
*          - User
*      parameters:
*          - name: "id"
*            in: "path"
*            description: "Id is that need the user to be fetch"
*            required: true
*            type: "string"
*            maximum: 10.0
*            minimum: 1.0
*            format: "int64" 
*      responses:
*          '200':
*              description: Resource added successfully
*          '500':
*              description: Internal server error
*          '400':
*              description: Bad request
*/


/**
 * @swagger
 * /user/token:
*   post:
*      description: Use to generate new access token
*      tags:
*          - User
*      parameters:
*          - in: body
*            name: User
*            description: User data
*            schema:
*              type: object
*              required:
*                 - refreshToken
*              properties:
*                  refreshToken:
*                      type: string
*                      minLength: 1
*                      maxLength: 500
*                      example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiTGFuenJ1aXpkZXNpZ25zOUBnbWFpbC5jb20iLCJwYXNzd29yZCI6IkJvdW5jZTEyMzQhIiwiaWF0IjoxNjMyMzg0OTA1LCJleHAiOjE2MzIzODQ5MjV9.zB8qiAPxgmhjyhcb5NObTreGQGDOfvV60WS1sa_3ZIY
*      responses:
*          '200':
*              description: Resource added successfully
*          '500':
*              description: Internal server error
*          '400':
*              description: Bad request
*/


// Order


/**
 * @swagger
 * /order/:
*   post:
*      description: User add order
*      tags:
*          - Order
*      parameters:
*          - in: body
*            name: Order Data
*            description: Information needed in product
*            schema:
*              type: object
*              required:
*                 - productName
*                 - productID
*                 - email
*                 - firstName
*                 - lastName
*                 - quantity
*              properties:
*                  productName:
*                      type: string
*                      minLength: 1
*                      maxLength: 45
*                      example: Hard Drive
*                  productId:
*                      type: string
*                      minLength: 1
*                      maxLength: 500
*                      example: 6145b01e1856828a1db518464
*                  userId:
*                      type: string
*                      minLength: 1
*                      maxLength: 500
*                      example: 6145b01e1856828a1db51895
*                  email:
*                      type: string
*                      minLength: 1
*                      maxLength: 500
*                      example: Lanzruizdesigns@gmail.com
*                  firstName:
*                      type: string
*                      minLength: 1
*                      maxLength: 500
*                      example: Lanz
*                  lastName:
*                      type: string
*                      minLength: 1
*                      maxLength: 500
*                      example: Ruiz
*                  quantity:
*                      type: number
*                      example: 20
*      responses:
*          '200':
*              description: Resource added successfully
*          '500':
*              description: Internal server error
*          '400':
*              description: Bad request
*/

/**
 * @swagger
 * /order/all/:
*   get:
*      description: Desplay all order 
*      tags:
*          - Order
*      responses:
*          '200':
*              description: Resource added successfully
*          '500':
*              description: Internal server error
*          '400':
*              description: Bad request
*/

/**
 * @swagger
 * /order/:
*   put:
*      description: Use to change the information of the order
*      tags:
*          - Order
*      parameters:
*          - in: body
*            name: Order
*            description: Order data
*            schema:
*              type: object
*              required:
*                 - orderId
*                 - productName
*                 - productID
*                 - email
*                 - firstName
*                 - lastName
*                 - quantity
*                 - status
*              properties:
*                  orderId:
*                      type: string
*                      minLength: 1
*                      maxLength: 500
*                      example: 6145b01e1856828a1db51895
*                  productName:
*                      type: string
*                      minLength: 1
*                      maxLength: 45
*                      example: Hard Drive
*                  productId:
*                      type: string
*                      minLength: 1
*                      maxLength: 500
*                      example: 6145b01e1856828a1db518464
*                  userId:
*                      type: string
*                      minLength: 1
*                      maxLength: 500
*                      example: 6145b01e1856828a1db51895
*                  email:
*                      type: string
*                      minLength: 1
*                      maxLength: 500
*                      example: Lanzruizdesigns@gmail.com
*                  firstName:
*                      type: string
*                      minLength: 1
*                      maxLength: 500
*                      example: Lanz
*                  lastName:
*                      type: string
*                      minLength: 1
*                      maxLength: 500
*                      example: Ruiz
*                  quantity:
*                      type: number
*                      example: 20
*                  status:
*                      type: number
*                      example: 1
*      responses:
*          '200':
*              description: Resource added successfully
*          '500':
*              description: Internal server error
*          '400':
*              description: Bad request
*/

/**
 * @swagger
 * /order/{orderId}:
*   get:
*      description: Find the order information in specific order id
*      tags:
*          - Order
*      parameters:
*          - name: "orderId"
*            in: "path"
*            description: "orderId is that need the order to be fetch"
*            required: true
*            type: "string"
*            maximum: 10.0
*            minimum: 1.0
*            format: "int64" 
*      responses:
*          '200':
*              description: Resource added successfully
*          '500':
*              description: Internal server error
*          '400':
*              description: Bad request
*/





// Product

/**
 * @swagger
 * /product/:
*   post:
*      description: User add their skills with its userId
*      tags:
*          - Product
*      parameters:
*          - in: body
*            name: Product Data
*            description: Information needed in product
*            schema:
*              type: object
*              required:
*                 - productName
*                 - productDescription
*                 - quantity
*              properties:
*                  productName:
*                      type: string
*                      minLength: 1
*                      maxLength: 45
*                      example: Hard Drive
*                  productDescription:
*                      type: string
*                      minLength: 1
*                      maxLength: 500
*                      example: Use to store data in computer
*                  quantity:
*                      type: number
*                      minLength: 1
*                      maxLength: 45
*                      example: 20
*      responses:
*          '200':
*              description: Resource added successfully
*          '500':
*              description: Internal server error
*          '400':
*              description: Bad request
*/

/**
 * @swagger
 * /product/all/:
*   get:
*      description: Find all vices with specific userId 
*      tags:
*          - Product
*      responses:
*          '200':
*              description: Resource added successfully
*          '500':
*              description: Internal server error
*          '400':
*              description: Bad request
*/

/**
 * @swagger
 * /product/{productId}:
*   get:
*      description: Find the product information in specific product id
*      tags:
*          - Product
*      parameters:
*          - name: "productId"
*            in: "path"
*            description: "ProductId is that need the product to be fetch"
*            required: true
*            type: "string"
*            maximum: 10.0
*            minimum: 1.0
*            format: "int64" 
*      responses:
*          '200':
*              description: Resource added successfully
*          '500':
*              description: Internal server error
*          '400':
*              description: Bad request
*/


/**
 * @swagger
 * /product/:
*   delete:
*      description: Delete the product in specific id
*      tags:
*          - Product
*      parameters:
*          - name: "productId"
*            in: body
*            description: "productId is that need the product to be delete"
*            required: true
*            type: "string"
*            maximum: 10.0
*            minimum: 1.0
*            format: "int64"
*            schema:
*              type: object
*              required:
*                 - productId
*              properties:
*                  productId:
*                     type: string
*                     minLength: 1
*                     maxLength: 45
*                     example: 6145b01e1856828a1db51895
*      responses:
*          '200':
*              description: Resource deleted successfully
*          '500':
*              description: Internal server error
*          '400':
*              description: Bad request
*/


/**
 * @swagger
 * /product/:
*   put:
*      description: Use to change the information of the product
*      tags:
*          - Product
*      parameters:
*          - in: body
*            name: Product
*            description: Product data
*            schema:
*              type: object
*              required:
*                 - productName
*                 - productDescription
*                 - quantity
*                 - productId
*              properties:
*                  productId:
*                      type: string
*                      minLength: 1
*                      maxLength: 100
*                      example: 6145a487f4585bdffdfef21c
*                  productName:
*                      type: string
*                      minLength: 1
*                      maxLength: 45
*                      example: Hard Drive
*                  productDescription:
*                      type: string
*                      minLength: 1
*                      maxLength: 45
*                      example: Use store the information
*                  quantity:
*                      type: number
*                      example: 1
*      responses:
*          '200':
*              description: Resource added successfully
*          '500':
*              description: Internal server error
*          '400':
*              description: Bad request
*/


app.use('/user', userRouter)
app.use('/product', productRouter)
app.use('/order', orderRouter)

app.use(cookieSession({
    name: 'google-auth-session',
    keys: ['key1', 'key2']
  }))
  
  const isLoggedIn = (req, res, next) => {
      if (req.user) {
          next();
      } else {
          res.sendStatus(401);
      }
  }
  
  app.use(passport.initialize());
  app.use(passport.session());
  
  const port = process.env.PORT || 5000


app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`))