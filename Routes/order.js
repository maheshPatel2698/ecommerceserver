const express = require('express')
const orderRouter = express.Router()
const Order = require('../Models/Order')
const isUser = require('../Middleware/isUser')

orderRouter.get('/', (req, res) => {
    res.send('orderRouter')
})

orderRouter.post('/createorder', isUser, async (req, res) => {
    try {
        const { address_line_1, address_line_2, contactNumber, pincode,

        } = req.body

        if (!(address_line_1 && address_line_2 && contactNumber && pincode)) {
            return res.status(404).json({
                success: false,
                message: "All information needed"
            })
        }
        req.body.user = req.id
        const order = await Order.create(req.body)

        res.status(200).json({
            success: true,
            order
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        })
        console.log(error)
    }
})

module.exports = orderRouter

