const express = require('express')
const productRouter = express.Router()
const Product = require('../Models/Product')
const isAdmin = require('../Middleware/isAdmin')


productRouter.get('/', (req, res) => {
    res.send('productRouter')
})

productRouter.get('/allproduct', async (req, res) => {

})

productRouter.get('/getoneproduct', async (req, res) => {

})


productRouter.post('/addproduct', isAdmin, async (req, res) => {
    try {

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            error: error.message
        })
    }
})


productRouter.put('/updateproduct', isAdmin, async (req, res) => {
    try {

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            error: error.message
        })
    }
})


productRouter.delete('/deleteproduct', isAdmin, async (req, res) => {
    try {

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            error: error.message
        })
    }
})


productRouter.get('/getoneproduct', isAdmin, async (req, res) => {
    try {

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            error: error.message
        })
    }
})


productRouter.put('/addquantity', isAdmin, async (req, res) => {
    try {

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            error: error.message
        })
    }
})


productRouter.put('/changeprice', isAdmin, (req, res) => {
    try {

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            error: error.message
        })
    }

})


module.exports = productRouter

