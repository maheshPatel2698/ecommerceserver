const express = require('express')
const userRouter = express.Router()
const User = require('../Models/User')
const cloudinary = require('cloudinary')

const encPassword = require('../Utils/encPassword')
const cookieToken = require('../Utils/cookieToken')
const validatePassword = require('../Utils/validatePassword')
const isUser = require('../Middleware/isUser')

userRouter.get('/', (req, res) => {
    res.send('userRouter')
})

// signup route
userRouter.post('/signup', async (req, res) => {
    const { email, password, fullname } = req.body

    if (!(email && password && fullname)) {
        return res.status(404).json({
            success: false,
            message: "All field required"
        })
    }

    if (req.files) {
        let imageObj = {}
        console.log('second condition approve')


        const result = await cloudinary.v2.uploader.upload(req.files.photo.tempFilePath, {
            folder: 'Producto'
        })

        if (!result) {
            return res.status(400).json({
                success: false,
                message: 'Problem in image uploading'
            })
        }
        else {
            imageObj = {
                secure_id: result.public_id,
                secure_url: result.secure_url
            }
        }

        const encPass = await encPassword(password)

        req.body.password = encPass
        req.body.photo = imageObj

        const user = await User.create(req.body)
        user.password = undefined
        res.status(201).json({
            success: true,
            user
        })
    }
    try {

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        })
        console.log(error)
    }
})

// login route
userRouter.post('/login', async (req, res) => {
    try {

        const { email, password } = req.body

        const user = await User.findOne({ email })
        const isValidated = await validatePassword(password, user.password)

        if (!(user && isValidated)) {
            return res.status(403).json({
                success: false,
                message: "Invalid Creds!"
            })
        }
        user.password = undefined
        cookieToken(user, res)

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        })
        console.log(error)
    }

})

userRouter.post('/logout', async (req, res) => {
    try {
        // expiring cookies i
        res.cookie('token', null, { expires: new Date(Date.now()), httpOnly: true })
        res.status(200).json({ success: true, message: "Logout Success" })
    } catch (error) {
        res.status(500).json({
            sucess: false,
            message: "Internal Server Error"
        })
        console.log(error)
    }

})

// deleteaccount Route
userRouter.get('/deleteaccount/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id)

        if (!user) {
            res.status(404).json({
                success: false,
                message: 'No user found'
            })
        }

        await cloudinary.v2.uploader.destroy(user?.secure_id)

        await User.findByIdAndDelete(req.params.id)
        res.status(200).json({
            success: true,
            message: "Account Deleted SuccessFully"
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

// profile Route
userRouter.get('/profile/:id', isUser, async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        if (!user) {
            res.status(404).json({
                success: false,
                message: 'No user found'
            })
        }
        user.password = undefined
        res.status(200).json({
            success: true,
            user
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

// update profile route
userRouter.put('/updateprofile/:id', isUser, async (req, res) => {
    try {

        const user = await User.findById(req.params.id)
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "No user found"
            })
        }

        await cloudinary.v2.uploader.destroy(user.photo.secure_id)


        if (req.files) {
            let imageObj = {}

            const result = await cloudinary.v2.uploader.upload(req.files.photo.tempFilePath, {
                folder: "Producto"
            })
            imageObj = {
                secure_id: result.public_id,
                secure_url: result.secure_url
            }

            req.body.photo = imageObj
        }

        const newUser = await User.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        })

        cookieToken(newUser, res)

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        })
        console.log(error)
    }

})

// userRouter.get('/myorders/:userid',isUser, async (req, res)=>{

// })
module.exports = userRouter

