const express = require('express')
const port = 55555
const bodyParser = require('body-parser')


let app = express()
app.set('view engine', 'pug')
app.set('views', 'views')
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('products'))

app.listen(port, () => {
    console.log('hi')
})

app.get('/', (req, res) => {
    //res.render('test',{title:"ooooooooooooooooooooooooooooooooooooooook"})
})

app.post('/post', (req, res) => {
    console.log(req.body.username)
    //res.send('post is working')
    res.render('test', { title: "ooooooooooooooooooooooooooooooooooooooook", username: req.body.username })
    

})

app.all('/all', (req, res) => {
    res.send('all is working')
})

app.get(/.*fly$/, (req, res) => {
    res.send('butterfly, dragonfly')
})

app.get('/category/:name', (req, res) => {
    // res.sendFile('/test.html')
    console.log(req.params)

    console.log(req.params.name)
    res.end()
})

app.get('/users/:userId/books/:bookId', (req, res) => {
    res.send(req.params)
})

app.all('/*', (req, res) => {
    res.send('oops 404')
})
