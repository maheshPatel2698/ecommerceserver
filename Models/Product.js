const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({

    product_name: {
        type: String,
        required: true
    },
    product_price: {
        type: String,
        required: true
    },
    product_description: {
        type: String,
        required: true
    },
    product_photos: [
        {
            secure_id: {
                type: String,
                required: true
            },
            secure_url: {
                type: String,
                required: true
            }
        }
    ],
    product_reviews: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            },
            product_review: {
                type: String,
            }
        }
    ],
    product_rating: {
        type: Number,
        default: 0
    },
    avaliable_quantity: {
        type: Number,
        required: true,
        default: 0
    },

})




module.exports = mongoose.model('Product', productSchema)