const express = require('express')
const productRouter = express.Router()
const Product = require('../Models/Product')



productRouter.get('/', (req, res) => {
    res.send('productRouter')
})


module.exports = productRouter

