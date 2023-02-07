/*
this file contains the functions related to token
*/

const jwt = require("jsonwebtoken");
const userModel = require("../model/userModel");

module.exports = async function (req, res, next) {
  //newly added

  let token;
  if (req.header("auth-token") || req.cookies) {
    token = (await req.header("auth-token"))
      ? req.header("auth-token")
      : req.cookies.token;
  }

  if (!token) return res.status(401).json({ msg: "access denied" });

  try {
    const verified = jwt.verify(req.cookies.token, process.env.SECRET_TOKEN);

    if (!verified) {
      return res.status(404).json({
        state: "FAILED",
        msg: "Invalid token against User",
      });
    }

    //this is case when one try the jwt of elsewhere and try to post
    const user = await userModel.findById(verified._id);
    if (!user) {
      return res.status(404).json({
        msg: "invalid user",
        state: "FAILED",
      });
    }
    console.log("verified", user);
    req.userState = verified; //it will contain the credentials passed while creating jwt
    next();
  } catch (error) {
    return res.status(401).json({
      msg: "Not authorized ",
    });
  }
};

// this function will act like a middleware which can be used to check everytime the request is valid or not
// like before adding any post or visiting any route which is under the logged in acc , this can be used as middleware
