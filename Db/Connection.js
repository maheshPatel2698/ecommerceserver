const mongoose = require('mongoose');

const Connection = () => {
    mongoose.connect(process.env.DB_URL, () => {
        console.log('Db Connected !')
    })

}



module.exports = Connection


