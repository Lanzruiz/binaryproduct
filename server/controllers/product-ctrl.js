const Product = require('../models/product-model')
const bcrypt = require("bcrypt");
const mongoose = require('mongoose')
require('dotenv').config()

createProduct = (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a person',
        })
    }

    const product = new Product(body)

    if (!product) {
        return res.status(400).json({ success: false, error: err })
    }

    product
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: product._id,
                message: 'Product created!',

            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Product not created!',
            })
        })
}

getAllProduct = async (req, res) => {

    await Product.find((err, product) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!product.length) {
            return res
                .status(404)
                .json({ success: false, error: `Product is empty` })
        }
        return res.status(200).json({ success: true, data: product })
    }).catch(err => console.log(err))
}

deleteProductById = async (req, res) => {
    const productId = req.body.productId
    await Product.findOneAndDelete({ _id: productId }, (err, product) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!product) {
            return res
                .status(404)
                .json({ success: false, error: `Product not found` })
        }

        return res.status(200).json({ success: true, message: "Product has been deleted!" })
    }).catch(err => console.log(err))
}


updateProductById = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    const productData = {
        productName: req.body.productName,
        productDescription: req.body.productDescription,
        quantity: req.body.quantity,
    }
    
    Product.updateOne({_id: req.body.productId}, productData).then(
        () => {
          res.status(201).json({
            message: 'Product updated successfully!'
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



getUserById = async (req, res) => {
    await User.findOne({ _id: req.params.id }, (err, user) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!user) {
            return res
                .status(404)
                .json({ success: false, error: `User not found` })
        }
        const UserData = {
            id: user._id,
            name: user.name, 
            email: user.email,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        }
        return res.status(200).json({ success: true, data: UserData })
    }).catch(err => console.log(err))
}

signUp = async (req, res) => {

    const password = req.body.password
    const salt = await bcrypt.genSalt(10);

    const newUser = {
 
        firstName: req.body.firstName,
        middleName: req.body.middleName,
        lastName: req.body.lastName,
        provider: req.body.provider,
        email: req.body.email,
        password: await bcrypt.hash(password, salt),
    }

    try {
        //find the user in our database 
        let userResult = await User.findOne({ email: req.body.email })

        if (userResult) {
          //If user present in our database.
          return res.status(400).send({status: 'exist', message: "user already exists"})
        } else {
          // if user is not preset in our database save user data to database.
          const userCreated = await User.create(newUser)
          return res.status(200).send({status: 'success', data: userCreated, message: "user created"})
        }
      } catch (err) {
        console.error(err)
      }
}

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
        return res.status(200).json({ status: "success", accessToken: accessToken, refreshToken: refreshTokenResult})

      } else {
        return res.status(400).json({ error: "Invalid Password" });
      }
    } else {
      return res.status(401).json({ error: "User does not exist" });
    }
}


getProductById = async (req, res) => {
    await Product.findOne({ _id: req.params.productId }, (err, product) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!product) {
            return res
                .status(404)
                .json({ success: false, error: `Product not found` })
        }
        const productData = {
            productId: product._id,
            productName: product.productName, 
            productDescription: product.productDescription,
            quantity: product.quantity,
            createdAt: product.createdAt,
            updatedAt: product.updatedAt,
        }
        return res.status(200).json({ success: true, data: productData })
    }).catch(err => console.log(err))
}

module.exports = {
    createProduct,
    getAllProduct,
    deleteProductById,
    updateProductById,
    getProductById
}