const routePath = require("express").Router();
const {
  registerUsr,
  login,
  logoutUsr,
  resetpassword,
} = require("../service/Auth");
const {
  updateDetails,
  viewRequest,
  verifyDoc,
  feesUpload,
  uploadDoc,
  removeStdFromQueue,
  getStudentData,
} = require("../service/crud");

const {
  verifyEssentialDetail,
  verifyOTP,
} = require("../utility/verifyEssential");

// const { updateDetails, uploadDoc } = require("../service/crud");

const {
  confirmPswd,
  encryptPswd,
  uploadMiddleWare,
} = require("../utility/middleware");
const verifyToken = require("../utility/verifyToken");

// multer
// const upload = require("../utility/multer");

// ----------AUTH PART-----------
// signUp
routePath.route("/register").post(confirmPswd, encryptPswd, registerUsr);

//   login
routePath.route("/login").post(login);

// logout
routePath.route("/logout").get(logoutUsr);

// send otp via email
routePath.route("/sendOTP").post(verifyEssentialDetail);

//verify mobile number and email
routePath.route("/verifyOTP").post(verifyOTP);

// resetpassword
routePath.route("/resetpassword").put(resetpassword);

// -----------END-----------------

// ------------CRUD---------------

// -----------student ------------

// getStudentData
routePath.route("/student").get(verifyToken, getStudentData);

//upload doc
routePath
  .route("/student/uploadDoc")
  .put(verifyToken, uploadMiddleWare, uploadDoc);

// edit details
routePath.route("/student/:studentId/edit").patch(verifyToken, updateDetails);

//admin View
routePath
  .route("/admin")
  .get(verifyToken, viewRequest)
  .patch(verifyToken, verifyDoc)
  .post(verifyToken, feesUpload)
  .delete(verifyToken, removeStdFromQueue);

// remove student by admin
// routePath.route("/admin").delete(verifyToken, removeStdFromQueue);

// ------------end-----------------
// export module
module.exports = routePath;
