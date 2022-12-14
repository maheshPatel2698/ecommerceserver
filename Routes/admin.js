const express = require('express')
const adminRouter = express.Router()
const Admin = require('../Models/Admin')

adminRouter.get('/', (req, res) => {
    res.send('adminRouter')
})



module.exports = adminRouter

