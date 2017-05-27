const fs = require('fs')
const queryString = require('querystring')
const database = require('./database/database')

module.exports = (req, res) => {
    //console.log(req.path === "/images/upload")

    if (req.path === "/upload/image") {
        //console.log(req.path === "/upload/image")
        if (req.method === 'GET') {
           // console.log('method=get')
           
            fs.readFile('./gallery.html', (err, data) => {
                if (err) {
                    console.log(err)
                    return
                }
                //console.log(data)
                res.writeHead(200, {
                    'Content-Type': 'text/html'
                })
                res.write(data)
                res.end()
            })

        }

        else if (req.method === 'POST') {
            //console.log('method=post')
           
            let post = ''

            req.on('data', chunk => {
                post += chunk
                let parsedResult = queryString.parse(post)
                let nik = parsedResult['NICK']
                let imgUrl = parsedResult['imageUrl']
                if (!nik || !imgUrl) {
                    //console.log('EMPTYYYYYYYYYYYYY')
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
                    //console.log('NOT EMPTYYYYYYYYYYY')
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

               

                //console.log('post-nickname is:  ' + parsedResult.NICK)
               // console.log('post-image url is:  ' + parsedResult.imageUrl)

            })

            //console.log('post-data1 is:  ' + post)

            req.on('end', function () {
                res.writeHead(302, {
                    'location': '/'

                })

               // console.log('end')
            })
        }
    }
    else { return true }
}
