const multer = require('multer');



const storage = multer.memoryStorage()

const fileFilter = (req, file, cb)=> {
    if(file.mimetype.startsWith('image/')){
        cb(null, true)
    }else{
        cb(new Error("Not an image! Please upload an image"), false);
    }
};


const upload  = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize : 5 * 1024 * 1024 // image size limit should be 5MB
    }
})

module.exports = upload;