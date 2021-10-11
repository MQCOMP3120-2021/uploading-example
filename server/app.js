const express = require('express')
const cors = require("cors")
const fileUpload = require('express-fileupload')
const apiRouter = require('./api')

const app = express()

const IMAGE_FOLDER = `${__dirname}/../images/`
app.use(cors())

app.use('/images', express.static(IMAGE_FOLDER))

// Note that this option available for versions 1.0.0 and newer. 
app.use(fileUpload({
    safeFileNames: true,
    preserveExtension: true
}));

app.use(apiRouter)

module.exports = app