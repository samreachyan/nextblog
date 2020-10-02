const mongoose = require('mongoose')
const config = require('../config/dev')

require('./models/portfolio')

exports.connect = () => {
    mongoose.connect(config.DB_URI, { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false }, () => {
        console.log('Connected to DB...')
    })
}
