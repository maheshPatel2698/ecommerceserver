const express = require('express')
const userRouter = express.Router()
const User = require('../Models/User')


userRouter.get('/', (req, res) => {
    res.send('userRouter')
})


module.exports = userRouter

