const homePageHandler = require('./home-page')
const faviconHandler = require('./favicon')
const staticFilesHandler = require('./static-files')
const mitkoPageHandler = require('./mitko-page')
const uploadImage = require('./image-upload')
const viewAllImages = require('./display')
const singleImage = require('./single-image')

module.exports = [
    homePageHandler,
    faviconHandler,
    mitkoPageHandler,
    uploadImage,
    viewAllImages,
    singleImage,
    staticFilesHandler
]