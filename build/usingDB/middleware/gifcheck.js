"use strict";

var _multer = _interopRequireDefault(require("multer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

//multer.diskStorage() creates a storage space for storing files.
var storage = _multer["default"].diskStorage({
  destination: function destination(req, file, cb) {
    if (file.mimetype === 'image/jpg' || file.mimetype === 'image/png') {
      cb(null, './files/images/');
    } else {
      cb({
        message: 'this file is neither a video or image file'
      }, false);
    }
  },
  filename: function filename(req, file, cb) {
    cb(null, file.originalname);
  }
});

var upload = (0, _multer["default"])({
  storage: storage
});
module.exports = upload;