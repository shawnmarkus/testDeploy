const multer = require("multer");
const path = require("path");
const mongoose = require("mongoose");

// const multerStrg =
module.exports = multer({
  storage: multer.diskStorage({
    destination: "constant/assets",
    filename: function (req, file, cb) {
      // no need of unique id
      // const uniqueId = new mongoose.Types.ObjectId().toString();
      // const uniqueSuffix = uniqueId + "." + file.originalname.split(".")[1];

      // pre logic
      // file.originalname.split(".")[0] +
      // Date.now() +
      // "." +
      // file.originalname.split(".")[1];

      // Date.now() + ".png";
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
