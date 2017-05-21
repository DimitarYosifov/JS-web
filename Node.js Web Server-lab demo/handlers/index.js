const homePageHandler = require('./home-page')
const faviconHandler = require('./favicon')
const staticFilesHandler = require('./static-files')

module.exports = [
    homePageHandler,
    faviconHandler,
    staticFilesHandler
]