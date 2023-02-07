/*
this is our middleware file
*/

const bcrypt = require("bcrypt");
const upload = require("../utility/multer");

function confirmPswd(req, res, next) {
  if (req.password !== req.confirmPswd) {
    res.send("password doesn't match");
  }
  next();
}

const encryptPswd = async (req, res, next) => {
  const saltRound = 10;
  const salt = await bcrypt.genSalt(saltRound);

  const hashPassword = await bcrypt.hash(req.body.password, salt);

  if (hashPassword) {
    req.body.password = hashPassword;
    next();
  } else {
    res.send("failed to hash password ");
  }
};

// error handler for multer
function uploadMiddleWare(req, res, next) {
  upload.single("image")(req, res, function (err) {
    if (err) {
      return res.json({
        msg: err,
        status: "failed",
        msg2: "multer has thrown error ",
      });
    } else {
      console.log("multer has done its part of work ");
      next();
    }
  });
}

module.exports = { confirmPswd, encryptPswd, uploadMiddleWare };
