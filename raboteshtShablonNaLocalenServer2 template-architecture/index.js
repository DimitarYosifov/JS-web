let env = process.env.NODE_ENV || 'development'
const settings = require('./server/config/settings')[env]
const express = require('express')
const mongoose = require('mongoose')
//const handlebars = require('express-handlebars')

const app = require('express')()

require('./server/config/database')(settings)
require('./server/config/express')(app)
require('./server/config/routes')(app)
require('./server/config/passport')()
 

mongoose.Promise = global.Promise
//app.get('/', (req, res) => {
//   res.render('index')
//})

app.listen(settings.port)
console.log('server ready on port 9999...')