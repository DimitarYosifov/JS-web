const mongoose = require('mongoose')
const encryption = require('../utilities/encryption')
const REQUIRED_VALIDATION_MESSAGE = '{PATH} is required'

let userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: REQUIRED_VALIDATION_MESSAGE, unique: true
    },
    firstName: { type: String, required: REQUIRED_VALIDATION_MESSAGE },
    secondName: { type: String, required: REQUIRED_VALIDATION_MESSAGE },
    salt: String,
    likedPosts:{type:Array},
    hashedPass: String,
    roles: [['Admin']]
})

userSchema.method({
    authenticate: function(password) {
        return encryption.generateHashedPassword(this.salt, password) === this.hashedPass
    }
})

let User = mongoose.model('User', userSchema)


module.exports = User
User.seedAdminUser = () => {
    User.find({}).then(users => {
        if (users.length > 0) return
        let salt = encryption.generateSalt()
        let hashedPass = encryption.generateHashedPassword(salt, '123456')
        User.create({
            username: 'admin', firstName: 'admin',
            secondName: 'admin', salt: salt,
            hashedPass: hashedPass, roles: ['Admin']
        })
    })
}

