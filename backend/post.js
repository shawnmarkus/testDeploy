const post = (req, res) => {
  if (req.userState.userRole === "admin") {
    return res.send("baap hu");
  } else {
    return res.send("beta hu");
  }
};
module.exports = post;

// const router = require("express").Router();
// const verify = require("./utility/verifyToken");

// router.route("/").post(verify, postDataAfterValidation);

// async function postDataAfterValidation(req, res) {
//   // console.log("hurrreyyyy", req.userState);

//   res.json({
//     post: {
//       data: "mere mann hai kuch desh ke liye krne ko",
//       description: "want to be in defence",
//     },
//   });
// }

// module.exports = router;
