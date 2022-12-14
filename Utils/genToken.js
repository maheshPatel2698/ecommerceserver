const jwt = require('jsonwebtoken')



const genToken = (user) => {
    const token = jwt.sign(
        { _id: user._id },
        process.env.JWT_SECRET,
        { expiresIn: '3d' }
    )
    return token
}

module.exports = genToken