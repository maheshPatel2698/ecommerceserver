const getToken = require('./genToken')

const cookieToken = async (user, res) => {
    const token = await getToken(user)
    const options = {
        expires: new Date(
            Date.now() + 3 * 24 * 60 * 60 * 1000
        ),
        httpOnly: true
    }
    res.status(200).cookie('token', token, options).json({
        sucess: true,
        token,
        user
    })
}

module.exports = cookieToken