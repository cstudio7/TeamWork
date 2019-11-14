import multer from 'multer';

//multer.diskStorage() creates a storage space for storing files.
const storage = multer.diskStorage({
    destination: (req, file,cb) => {
        if(file.mimetype === 'image/jpg' || file.mimetype === 'image/png'){
            cb(null, './files/images/');
        }else{
            cb({message: 'this file is neither a video or image file'}, false)
        }
    },
    filename: function(req, file, cb){
        cb(null, file.originalname);
    }
});
const upload = multer({storage:storage});
module.exports = upload;
