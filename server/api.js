const express = require('express') 
const fs = require('fs')
const apiRouter = express.Router()

const IMAGE_FOLDER = `${__dirname}/../images/`

// get a list of images
apiRouter.get('/images/', (req, res) => {
    const files = fs.readdirSync(IMAGE_FOLDER)
    // convert raw filenames to relative urls
    const result = {
        files: files.map((f) => `/images/${f}`)
    }
    res.send(result)
})

// Upload an image and store into the images folder
// https://github.com/richardgirges/express-fileupload/tree/master/example#basic-file-upload
apiRouter.post('/images/', (req, res) => {
    
      if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
      }
    
      // The name of the input field (i.e. "imageFile") is used to retrieve the uploaded file
      const imageFile = req.files.imageFile;
      if (!imageFile) {
        return res.status(400).send('No files were uploaded.');
      } 

      // generate a safe filename but preserve the file extension of the uploaded file
      const parts = imageFile.name.split('.')
      let extension = ''
      if (parts.length > 1) {
        extension = '.' + parts.pop()
      }
      const filename = imageFile.md5 + extension;
      const uploadPath = IMAGE_FOLDER + filename
    
      // Use the mv() method to place the file somewhere on your server
      imageFile.mv(uploadPath, function(err) {
        if (err) {
            console.log(err)
            return res.status(500).send(err);
        }
    
        // return the new image URL
        res.send('/images/' + filename);
      });
  })
  

module.exports = apiRouter