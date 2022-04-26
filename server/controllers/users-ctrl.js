const User = require('../models/users-model')
const bcrypt = require("bcrypt");
const mongoose = require('mongoose')
require('dotenv').config()

createUsers = (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a person',
        })
    }

    const user = new User(body)

    if (!user) {
        return res.status(400).json({ success: false, error: err })
    }

    user
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: user._id,
                message: 'User created!',

            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'person not created!',
            })
        })
}

deleteUser = async (req, res) => {
    const userId = req.body.id
    await User.findOneAndDelete({ _id: userId }, (err, user) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!user) {
            return res
                .status(404)
                .json({ success: false, error: `Movie not found` })
        }

        return res.status(200).json({ success: true, message: "User has been deleted!" })
    }).catch(err => console.log(err))
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

updateUser = async (req, res) => {
    const body = req.body
    const password = req.body.password
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt)

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    console.log('name to change', req.body.name)

    const userData = {
        name: req.body.name,
        email: req.body.email,
        password: passwordHash,
    }
    
    User.updateOne({_id: req.body.id}, userData).then(
        () => {
          res.status(201).json({
            message: 'Thing updated successfully!'
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

updateAddressByUserId = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    const userAddress = {
        userId: req.params.userId,
        unit: req.body.unit,
        street: req.body.street,
        city: req.body.city,
        country: req.body.country,

    }
   
    UserAddress.updateOne({userId: req.params.userId}, userAddress).then(
        () => {
          res.status(201).json({
                message: 'Vices updated successfully!'
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


module.exports = {
    createUsers,
    getUserById,
    signUp,
    login,
}