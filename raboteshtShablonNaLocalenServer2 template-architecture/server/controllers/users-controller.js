const encryption = require('../utilities/encryption')
const User = require('mongoose').model('User')

module.exports = {
    registerGet: (req, res) => {
        res.render('users/register')
    },
    registerPost: (req, res) => {
        let reqUser = req.body
        let salt = encryption.generateSalt()
        let hashedPassword = encryption.generateHashedPassword(salt, reqUser.password)

        if (reqUser.username === '' ||
            reqUser.firstName === '' ||
            reqUser.secondName === '' ||
            reqUser.password === ''
        ) {
            res.locals.globalError = 'fill all fields'
            res.render('users/register')
        }
        else {
            User.create({
                username: reqUser.username,
                firstName: reqUser.firstName,
                secondName: reqUser.secondName,
                salt: salt,
                hashedPass: hashedPassword
            }).then(user => {
                req.logIn(user, (err, user) => {
                    if (err) {
                        res.locals.globalError = err
                        res.render('users/register', user)
                    }
                    res.redirect('/')
                })
            })
        }
    },

    loginGet: (req, res) => {
        res.render('users/login')
    },

    loginPost: (req, res) => {
        let reqUser = req.body
        User.findOne({ username: reqUser.username }).then(user => {
            if (!user) {
                res.locals.globalError = 'invalid user data'
                res.render('users/login')
                return
            }
            if (!user.authenticate(reqUser.password)) {
                res.locals.globalError = 'invalid user data'
                res.render('user/login')
                return
            }
            req.logIn(user, (err, user) => {
                if (err) {
                    res.locals.globalError = err
                    res.render('/users/login')
                }
                res.redirect('/')
            })
        })
    },
    logout: (req, res) => {
        req.logout()
        res.redirect('/')
    }
}