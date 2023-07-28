const multer = require("multer")
const uploadController = require('express').Router()

// destination: this is the location where the uploaded image file is saved
// filename: the name of the image that is saved and uploaded
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/images")
    },

    filename : (req, file, cb) => {
        cb(null, req.body.filename)
    }
})


const upload = multer({
    storage
})

//this is going to check the req.body for req.body.image
uploadController.post('/image', upload.single("image"), async(req, res) => {
    try{
        return res.status(200).json("File uploaded successfully")
    } catch (error){
        console.error(error)
    }
})

module.exports = uploadController
