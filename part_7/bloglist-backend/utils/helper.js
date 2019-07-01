const config = require('./config')
const User = require('../models/user')
const mongoose = require('mongoose')

console.log('HELPER')

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true })
    .then(() => {
        User.findByIdAndDelete('5c4857c4003ad1a6e6626932').then(resp => {
            console.log(resp)
            mongoose.connection.close()
        })
    })
    .catch((error) => {
        console.log('error connection to MongoDB:', error.message)
    })
