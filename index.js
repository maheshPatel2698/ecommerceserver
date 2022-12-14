// importing all packages
const express = require('express')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const cookieParser = require('cookie-parser')
const Connection = require('./Db/Connection')
const app = express()
require('dotenv').config()
const { PORT } = process.env

// importing all router
const user = require('./Routes/user')
const admin = require('./Routes/admin')
const product = require('./Routes/product')
const order = require('./Routes/order')



// all Middleware
app.use(express.json())
app.use(cors({
    origin: 'http://localhost:3000'
}))
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/temp/',

}))
app.use(cookieParser())
Connection()
// home  route
app.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: "Welcome To Ecommerce site"
    })
})

// All routes
app.use('/api/v1/user', user)
app.use('/api/v1/admin', admin)
app.use('/api/v1/product', product)
app.use('/api/v1/order', order)





app.listen(PORT, () => {
    console.log(`Server is Running at http://localhost:${PORT}`)
})