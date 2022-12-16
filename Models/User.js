const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    address: {
        address_line_1: {
            type: String,
            default: "Needed To be set"
        },
        address_line_2: {
            type: String,
            default: "Needed To be set"
        },
        contactNumber: {
            type: Number,
            default: 000 - 000 - 0000
        },
        pincode: {
            type: Number,
            default: 000000
        }

    },
    orders: [
        {
            order: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Order'
            },
            product: {
                product_id: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Product'
                },
                quantity: {
                    type: Number,
                    default: 0
                }
            }
        }
    ],
    photo: {
        secure_id: {
            type: String
        },
        secure_url: {
            type: String
        }
    },
    status: {
        type: String,
        default: 'User'
    }

})




module.exports = mongoose.model('User', userSchema)