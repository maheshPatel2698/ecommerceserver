const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    products: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref: 'Product'
            },
            product_price: {
                type: Number,
                required: true
            },
            product_quantity: {
                type: Number,
                default: 1,
                required: true
            },
            product_name: {
                type: String,
                required: true
            },
            product_size: {
                type: String,
                required: true
            },
            totel_amount: {
                type: Number,
                required: true
            },
            product_image: {
                secure_id: {
                    type: String,
                    required: true
                },
                secure_url: {
                    type: String,
                    requried: true
                }
            }


        }
    ],
    shipping_address: {
        address_line_1: {
            type: String,
            required: true
        },
        address_line_2: {
            type: String,
            required: true
        },
        contactNumber: {
            type: Number,
            required: true
        },
        pincode: {
            type: Number,
            required: true
        }

    },
    created_at: {
        type: Date,
        default: Date.now
    },
    payment_status: {
        type: String,
        default: 'Unpaid'
    },
    delivery_status: {
        type: String,
        default: "Order Booked",
        required: true
    }

})




module.exports = mongoose.model('Order', orderSchema)