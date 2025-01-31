const multer = require("multer");
const { uid } = require("uid");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/events-images");
  },
  filename: function (req, file, cb) {
    cb(null, uid() + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" 
    || file.mimetype === "image/jpg"
    || file.mimetype === "image/png"
    || file.mimetype === "image/webp"
  ) {
    cb(null, true);
  } else {  
    cb(null, false);
  }
}

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});

module.exports = {
  upload,
};
