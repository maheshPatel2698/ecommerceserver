const mongoose = require('mongoose')


const adminSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: 'Admin'
    },
    secret_key: {
        type: String,
        required: true
    }

})




module.exports = mongoose.model('Admin', adminSchema)