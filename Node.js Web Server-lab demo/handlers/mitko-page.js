const fs = require('fs')

module.exports = (req, res) => {

    if (req.path === '/mitko') {
        fs.readFile('./mitko.html', (err, data) => {
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
        return true
    }
}