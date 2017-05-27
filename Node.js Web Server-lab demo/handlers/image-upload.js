const fs = require('fs')
const queryString = require('querystring')
const database = require('./database/database')

module.exports = (req, res) => {

    if (req.path === "/upload/image") {

        if (req.method === 'GET') {

            fs.readFile('./gallery.html', (err, data) => {
                if (err) {
                    console.log(err)
                    return
                }

                res.writeHead(200, {
                    'Content-Type': 'text/html'
                })
                res.write(data)
                res.end()
            })
        }

        else if (req.method === 'POST') {

            let post = ''

            req.on('data', chunk => {
                post += chunk
                let parsedResult = queryString.parse(post)
                let nik = parsedResult['NICK']
                let imgUrl = parsedResult['imageUrl']
                if (!nik || !imgUrl) {
                    fs.readFile('./friendly-error.html', (err, data) => {
                        if (err) {
                            console.log(err)
                            return
                        }
                        res.writeHead(200, {
                            'Content-Type': 'text/html'
                        })
                        res.write(data)
                        res.end()
                    })
                }

                else {
                    database.save(parsedResult)
                    fs.readFile('./successUpload.html', (err, data) => {
                        if (err) {
                            console.log(err)
                            return
                        }
                        res.writeHead(200, {
                            'Content-Type': 'text/html'
                        })
                        res.write(data)
                        res.end()
                    })
                }
            })

            req.on('end', function () {
                res.writeHead(302, {
                    'location': '/'
                })
            })
        }
    }
    else { return true }
}
