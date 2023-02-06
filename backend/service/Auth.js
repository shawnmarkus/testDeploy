/*
this is the service folder which will contain the all the function file like all authenticate file in here like 

--->registerUsr,
--->login,
--->logoutUsr,
--->resetpassword,
--->forgotPassword,

*/

const userModel = require("../model/userModel");
const cryptoJs = require("crypto-js");
const bcrypt = require("bcrypt");
const sendEmail = require("../utility/sendEmail");

// REGISTER
const registerUsr = async (req, res) => {
  console.log("kha hai bey");
  try {
    let userExist = await userModel.findOne({
      RollNumber: req.body.RollNumber,
    });
    // console.log("userExist", userExist);
    if (userExist) {
      res.status(404).json({
        msg: "user already exist, try different RollNumber",
        state: "FAILED",
      });
    } else {
      await userModel
        .create({
          RollNumber: req.body.RollNumber,
          password: req.body.password,
          Name: req.body.Name,
          email: req.body.email,
          contactNumber: req.body.contactNumber,
          branch: req.body.branch,
          batch: req.body.batch,
          userRole: req.body.userRole,
          studentType: req.body.studentType,
          address: req.body.address,
        })
        .then((response) => {
          console.log(response);
          res.status(200).json({
            msg: "Entry Cretaed",
            state: "ENTRY_SUCCESS",
            obj: response,
          });
        })
        .catch((error) => {
          res.status(404).json({
            body: req.body,
            msg: `Error Occured :  ${error} with error code ${error}`,
            // msg: "error occured : " + error.errmsg,
            state: "FAILED",
          });
          console.log(`Error Occured :  ${error} with error code ${error}`);
        });
    }
  } catch (err) {
    console.log("error:failed to make request at try level", err);
  }
};

// LOGIN
const login = async (req, res) => {
  // console.log("chitthi aayi hai");
  let userExist = await userModel.findOne({ RollNumber: req.body.RollNumber });
  console.log(req.body.RollNumber);

  if (!userExist) {
    res.status(404).json({
      msg: "user doesn't exist",
      state: "FAILED",
    });
  } else {
    console.log(`userExist ==> ${req.body.password}`);

    // newly added
    const validPswd = await userExist.matchPassword(req.body.password);

    if (!validPswd) {
      return res.status(403).json({
        msg: "login password is wrong",
        state: "FAILED",
      });
    }

    // newly added
    const usrToken = await userExist.getSignedToken(); //we don't need the argument tobe passed becoz we dont need to compare with any external input

    // we are setting cookies also
    res.cookie("token", usrToken, {
      httpOnly: true,
      maxAge: 60 * 1000 * 24 * 60,
      sameSite: "None",
    }); //taking the tenure of the cookies is equal to the life span of the jwt

    return (
      res
        // .header("auth-token", usrToken)
        .set("auth-token", usrToken)
        .status(200)
        .json({ usrToken, state: "LOGGED_IN", userRole: userExist.userRole })
    );
  }
};

// to logout
const logoutUsr = async (req, res) => {
  res.clearCookie("token");
  res.send("logged out");
};

// RESET PASSWORD
async function resetpassword(req, res) {
  try {
    const userExist = await userModel.findOne({
      email: req.body.email,
    });

    console.log("userExist -------->", userExist);

    if (!userExist) {
      return res.status(400).json({
        state: "TIME_OUT",
        msg: "time exceeded to reset the password",
      });
    }

    const saltRound = 10;
    userExist.password = await bcrypt.hash(req.body.password, saltRound); //it is the value passed on request

    await userExist.save();

    return res.status(201).json({
      state: "SUCCESS",
      msg: "reset success",
      data: userExist,
    });
  } catch (error) {
    console.log("error from reset side ", error);
    return res.status(404).json({
      msg: "error occured while reset of password",
      state: "FAILED",
    });
  }
}

// module export
module.exports = {
  registerUsr,
  login,
  logoutUsr,
  resetpassword,
};
