const mongoose = require('mongoose')
const User = require('../data/User')
const Article=require('../data/answers')
const Answers=require('../data/articles')
mongoose.Promise = global.Promise

//require('../data/User')
//require('/data/articles')

module.exports = (settings) => {
    mongoose.connect(settings.db)
    let db = mongoose.connection
    db.once('open', (err) => {
        if (err) {
            throw err

        }
        console.log('MongoDB ready!')
        User.seedAdminUser()
    })
    db.on('error', (err) => console.log('Database error: ' + err))
}
