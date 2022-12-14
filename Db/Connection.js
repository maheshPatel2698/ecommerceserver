const mongoose = require('mongoose');

const Connection = () => {
    mongoose.connect(process.env.DB_URL, () => {
        console.log('Db Connected !')
    })
    mongoose.set('strictQuery', true);

}



module.exports = Connection


