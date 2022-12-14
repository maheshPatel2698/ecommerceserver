const express = require('express')
const orderRouter = express.Router()
const Order = require('../Models/Order')


orderRouter.get('/', (req, res) => {
    res.send('orderRouter')
})



module.exports = orderRouter

