const database = require('./database/database')
const fs = require('fs')

module.exports = (req, res) => {
    // console.log(req.path)
    if (req.path === '/display') {
        //console.log(req.path)
        fs.readFile('./allImages.html', (err, data) => {
            if (err) {

                console.log(err)
                return
            }
            res.writeHead(200, {
                'Content-Type': 'text/html'
            })

            let pictures = database.get()
            //console.log(pictures[0].NICK)
            //let result = ''
            res.write(`<ul>`)
            for (let i = 0; i < pictures.length; i++) {
                //console.log(pictures.NICK)
                let name = pictures[i ].NICK
                let imgUrl = pictures[i ].imageUrl
                res.write(`<li><a href='/details/image/${i}'>${name}</a></li>`)
            }
            res.write(`</ul>`)

            res.write(data)




            res.end()
        })
    }
    else {
        return true
    }
}
//console.log(req.path)








