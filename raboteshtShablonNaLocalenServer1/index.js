const express = require('express')
const config = require('./config/config')

const port = 4000
let environment = process.env.NODE_ENV || 'development'
let app = express()

require('./config/database.config')(config[environment])
require('./config/express')(app, config[environment])
require('./config/routes')(app)
  
app.listen(port)

//app.get('/', (req, res) => {
//    console.log('hiii')
//   res.send('hi it;s ok')
//}
//)

