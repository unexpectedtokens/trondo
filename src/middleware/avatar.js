const multer = require("multer");

module.exports = avatarUpload = multer({
  limits: {
    fileSize: 1000000
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(
        new Error("Please upload a picture that's either jpg, jpeg or png")
      );
    }
    cb(undefined, true);
  }
});
