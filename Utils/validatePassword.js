const bct = require('bcryptjs')

const validatePassword = async (password, userPassword) => {
    const isValidated = await bct.compare(password, userPassword)
    return isValidated
}

module.exports = validatePassword