const jwt = require('jsonwebtoken')
const Admin = require('../Models/Admin')
const isAdmin = async (req, res, next) => {

    try {
        const token = req.header('Token') || req.cookies.token
        if (!token) {
            return res.status(403).send("token is missing")
        }
        const decode = jwt.verify(token, process.env.JWT_SECRET)
        req.id = decode._id
        const admin = await Admin.findById(req.id)
        if (!admin) {
            return res.status(404).json({
                success: true,
                message: 'No admin found'
            })
        }
        if (admin.status === 'Admin') {
            return next()
        }
    } catch (error) {
        return res.status(401).send("Invalid token")

    }

}


module.exports = isAdmin