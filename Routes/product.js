const express = require('express')
const productRouter = express.Router()
const Product = require('../Models/Product')
const isAdmin = require('../Middleware/isAdmin')
const cloudinary = require('cloudinary')

productRouter.get('/', (req, res) => {
    res.send('productRouter')
})

productRouter.get('/allproduct', async (req, res) => {
    try {
        const products = await Product.find(req.query ? req.query : {})
        if (!products) {
            return res.status(404).json({
                success: false,
                message: 'No product found'
            })
        }

        res.status(200).json({
            success: true,
            products
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            error: error.message
        })
    }
})


productRouter.get('/getoneproduct/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
        if (!product) {
            res.status(404).json({
                success: false,
                message: "No product found"
            })
        }
        res.status(200).json({
            success: true,
            product
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            error: error.message
        })
    }

})


productRouter.post('/addproduct', isAdmin, async (req, res) => {
    try {
        const { product_name, product_price, product_description, product_rating, avaliable_quantity } = req.body

        if (!(product_name && product_price && product_description && avaliable_quantity)) {
            return res.status(404).json({
                success: false,
                messsage: 'All field required'
            })
        }
        let imageArray = []

        if (req.files) {
            for (let index = 0; index < req.files.photos.length; index++) {
                const result = await cloudinary.v2.uploader.upload(req.files.photos[index].tempFilePath, {
                    folder: 'Producto'
                })
                imageArray.push({
                    secure_id: result.public_id,
                    secure_url: result.secure_url
                })
            }
        }
        req.body.product_photos = imageArray
        req.body.Admin = req.id

        const product = await Product.create(req.body)

        res.status(201).json({
            success: true,
            product
        })




    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            error: error.message
        })
    }
})


productRouter.put('/updateproduct/:id', isAdmin, async (req, res) => {
    try {

        const product = await Product.findById(req.params.id)

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "No product found"
            })
        }

        for (let index = 0; index < product.product_photos.length; index++) {
            await cloudinary.v2.uploader.destroy(product.product_photos[index].secure_id)
        }
        const { product_name, product_price, product_description, product_rating, avaliable_quantity } = req.body
        if (!(product_name && product_price && product_description && avaliable_quantity)) {
            return res.status(404).json({
                success: false,
                messsage: 'All field required'
            })
        }

        let imageArray = []


        if (req.files) {
            for (let index = 0; index < req.files.photos.length; index++) {
                const result = await cloudinary.v2.uploader.upload(req.files.photos[index].tempFilePath, {
                    folder: 'Producto'
                })
                imageArray.push({
                    secure_id: result.public_id,
                    secure_url: result.secure_url
                })
            }
        }
        req.body.product_photos = imageArray


        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        })

        res.status(200).json({
            success: true,
            updatedProduct
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            error: error.message
        })
    }
})


productRouter.delete('/deleteproduct/:id', isAdmin, async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "No Product found"
            })
        }
        for (let index = 0; index < product.product_photos.length; index++) {
            await cloudinary.v2.uploader.destroy(product.product_photos[index].secure_id)
        }
        await Product.findByIdAndDelete(product._id)

        res.status(200).json({
            success: true,
            message: "Product Deleted"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            error: error.message
        })
    }
})


productRouter.get('/getoneproduct/:id', isAdmin, async (req, res) => {
    try {

        const product = await Product.findById(req.params.id)
        if (!product) {
            res.status(404).json({
                success: false,
                message: "No product found"
            })
        }
        res.status(200).json({
            success: true,
            product
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            error: error.message
        })
    }
})


productRouter.get('/uploadedproduct', isAdmin, async (req, res) => {
    try {

        const products = await Product.find({ Admin: req.id })

        if (!products) {
            return res.status(404).json({
                success: false,
                message: 'No product uploaded by this product'
            })
        }
        res.status(200).json({
            success: true,
            products
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            error: error.message
        })
    }
})


productRouter.put('/updatequantity/:id', isAdmin, async (req, res) => {

    try {

        const product = await Product.findById(req.params.id)

        if (!product) {
            return res.status(200).json({
                success: false,
                message: "No product found"
            })
        }
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        })

        res.status(200).json({
            success: true,
            updatedProduct
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            error: error.message
        })
    }
})


productRouter.put('/changeprice/:id', isAdmin, async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)

        if (!product) {
            return res.status(200).json({
                success: false,
                message: "No product found"
            })
        }
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        })

        res.status(200).json({
            success: true,
            updatedProduct
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            error: error.message
        })
    }

})


module.exports = productRouter

