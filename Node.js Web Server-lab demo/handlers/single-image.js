const fs = require('fs')
const database = require('./database/database')

module.exports = (req, res) => {

    let pictures = database.get()
    let imgUrl
    let length = pictures.length
    let n

    if (length === 0) {
        return true
    }
    else {

        for (let i = 0; i < length; i++) {
            if (req.path === '/details/image/' + i) {
                n = i
                imgUrl = pictures[n].imageUrl


                fs.readFile('./single-image.html', (err, data) => {
                    if (err) {
                        console.log(err)
                        return
                    }

                    res.writeHead(200, {
                        'Content-Type': 'text/html'
                    })
                    res.write(data)
                    res.write(`<img src="${imgUrl}" style="width: 200px" width="200px">`, () => {
                        res.end()
                    })
                    //res.write(data)

                })
            }
        }
        //let test = '/details/image/0'
        //console.log('i='+i)
        //console.log(test)
        //  console.log(req.path)


    }
    if (n === undefined) {
        //res.end()
        return true


    }
    //res.end()
}



    // res.write(data)


