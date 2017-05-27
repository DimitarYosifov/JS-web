const fs = require('fs')

let getContentType = (url) => {
    let contentType = 'text/plain'
    if (url.endsWith('.css')) {
        contentType = 'text/css'
    }
    else if (url.endsWith('.js')) {
        contentType = 'application/javascript'
    }
    else if (url.endsWith('.html')) {
        contentType = 'text/html'
    }

    return contentType
}

function validate(path) {
    if (path.endsWith('.html') ||
        req.path.endsWith('.css') ||
        req.path.endsWith('.js') ||
        req.path.endsWith('.jpg')) {
        return true
    }
    else { return false }
}

module.exports = (req, res) => {
    //  console.log(req.path)
    fs.readFile('.' + req.path, (err, data) => {
        if (err
            //|| !req.path.startsWith('/content')
            // ||!req.method === 'GET'
           
        ) {
             console.log(err)
            res.writeHead(404)
            res.write('404 page not found')
            res.end()
            return
        }


        res.writeHead(200, {
            'Content-Type': getContentType(req.path)
        })
        res.write(data)
        res.end()

    })
}