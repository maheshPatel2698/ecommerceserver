const express = require('express')
const adminRouter = express.Router()
const Admin = require('../Models/Admin')
const encPassword = require('../Utils/encPassword')
const validatePassword = require('../Utils/validatePassword')
const cookieToken = require('../Utils/cookieToken')


adminRouter.get('/', (req, res) => {
    res.send('adminRouter')
})


adminRouter.post('/adminsignup', async (req, res) => {
    try {
        const { email, password, secret_key, fullname } = req.body

        if (!(email && password && secret_key && fullname)) {
            return res.status(403).json({
                success: false,
                message: 'All field requried'
            })
        }
        const encPass = await encPassword(password)
        const encSecret = await encPassword(secret_key)
        req.body.password = encPass
        req.body.secret_key = encSecret

        const admin = await Admin.create(req.body)
        admin.password = undefined
        admin.secret_key = undefined

        res.status(200).json({
            success: true,
            admin
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


adminRouter.post('/adminlogin', async (req, res) => {
    try {

        const { email, password, secret_key } = req.body
        if (!(email && password && secret_key)) {
            return res.status(403).json({
                success: false,
                message: 'All field requried'
            })
        }

        const admin = await Admin.findOne({ email })
        if (!admin) {
            return res.status(404).json({
                success: false,
                message: "No admin Found"
            })
        }

        const isValidatedPassword = await validatePassword(password, admin.password)
        const isValidatedSecretkey = await validatePassword(secret_key, admin.secret_key)


        if (!(isValidatedPassword && isValidatedSecretkey)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid Creds'
            })
        }
        admin.password = undefined
        admin.secret_key = undefined


        cookieToken(admin, res)

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        })
        console.log(error)
    }
})


adminRouter.post('/adminlogout', (req, res) => {
    try {
        // expiring cookies i
        res.cookie('token', null, { expires: new Date(Date.now()), httpOnly: true })
        res.status(200).json({ success: true, message: "Logout Success" })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        })
        console.log(error)
    }
})



module.exports = adminRouter

