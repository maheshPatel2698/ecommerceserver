const bct = require('bcryptjs')


const encPassword = async (password) => {
    const encPass = await bct.hash(password, 10)
    return encPass
}


module.exports = encPassword