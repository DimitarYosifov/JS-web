const http = require('http')
const port = 11111
const url = require('url')
const handlers = require('./handlers')
const queryString = require('querystring')

http
    .createServer((req, res) => {
        req.path = url.parse(req.url).pathname

        for (let handler of handlers) {
            let next = handler(req, res)
            if (!next) {
                break
            }
        }
    })
    .listen(port)

console.log('server listening on port 11111')

