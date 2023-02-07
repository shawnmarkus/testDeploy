const multer = require("multer");
const path = require("path");
const mongoose = require("mongoose");

module.exports = multer({
  storage: multer.diskStorage({
    destination: "constant/assets",
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  }),

  fileFilter: (req, file, cb) => {
    let ext = path.extname(file.originalname);
    if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
      cb(new Error("file type is not supported", false));
    }
    cb(null, true);
  },

  limits: { fileSize: 200 * 1024 }, //200kb is max size of the file allowed
});

// module.exports = multerStrg;
