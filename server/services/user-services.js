const { NotFound, NotAcceptable } = require('http-errors');
const User = require('../models/users-model')
const bcrypt = require("bcrypt");
const mongoose = require('mongoose')
require('dotenv').config()


createUser = async (body) => {

    try {

        const userBody = {
            firstName: body.firstName,
            middleName: body.middleName,
            lastName: body.lastName,
            email: body.email,
            status: 1,
            password: body.password,
            provider: body.provider,
        }
        const user = new User(body)

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
    } catch (error) {
       console.error(e);
    }
}

googleSignUp = async (googlUser) => {
    try {

        const userBody = {
            firstName: body.firstName,
            lastName: body.lastName,
            email: body.email,
            status: 1,
            password: 'google',
            provider: 'google',
        }
        const user = new User(body)

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
    } catch (error) {
       console.error(e);
    }
}

facebookSignUp = async (googlUser) => {
    try {

        const userBody = {
            firstName: body.firstName,
            lastName: body.lastName,
            email: body.email,
            status: 1,
            password: 'facebook',
            provider: 'facebook',
        }
        const user = new User(body)

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
    } catch (error) {
       console.error(e);
    }
}


findUserById = async (userId) => {
   

   try {
       const user = await User.findOne({ _id: userId })
       const userData = {
           userId: user._id,
           name: user.name,
           email: user.email,
           createdAt: user.createdAt,
           updatedAt: user.updatedAt,
       }
       return userData;
    } catch (e) {
        console.error(e);
    }

    
}

findUserByEmail = async (email) => {
    try {
        const user = await User.findOne({ email: email })
        const userData = {
            userId: user._id,
            name: user.name,
            email: user.email,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        }
        return userData;
     } catch (e) {
         console.error(e);
     }
}

module.exports = {
    createUser,
    findUserById,
    findUserByEmail,
    googleSignUp,
    facebookSignUp,
}