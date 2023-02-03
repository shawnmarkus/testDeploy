const crypto = require("crypto");
const sendEmail = require("./sendEmail");
const userModel = require("../model/userModel");

const verifyEssentialDetail = async (req, res) => {
  // const contactNumber = req.contactNumber;
  const email = req.body.email;
  console.log("email address received on req===>" + req.body.email);

  let isEmailExist = await userModel.findOne({ email });

  if (!isEmailExist) {
    return res.status(404).json({
      msg: "EMAIL DO NOT EXIST",
    });
  }

  //to generate random otp of 6 digit - recurcive method
  const getCorrectOtp = function () {
    let localOTP = parseInt(
      parseInt(crypto.randomBytes(3).toString("hex"), 16),
      10
    );
    if (localOTP < 100000 || localOTP > 999999) {
      return getCorrectOtp();
    }
    return localOTP;
  };

  const OTP = getCorrectOtp();
  // console.log(OTP);

  const message = `
    <h2> you have requested OTP that is ${OTP}  </h2>
    <p>please remember <b>OTP</b> is valid for <b>10 min</b> </p>
    `;

  console.log("abhi upar hu sending process ke");

  try {
    await sendEmail({
      to: email,
      subject: " Requested OTP ",
      text: message,
    });

    console.log("data is send and the retured value is ");
    // setting the cookies after the
    const verificationToken = crypto
      .createHash("sha256")
      .update(OTP.toString())
      .digest("hex");

    res
      .cookie("OTP_TOKEN", verificationToken, {
        httpOnly: true,
        maxAge: 60 * 1000 * 10,
      })
      .json({
        msg: "OTP sent",
      });
    console.log("abhi neeche hu sending process ke");
  } catch (error) {
    res.status(404).json({
      msg: "FAILED_TO_MAIL",
    });
  }

  // otp generation programs end here

  // OTP generation approach by elimanation extra digits from last
  // const generatedOTP=crypto.randomBytes(3, function(err, buffer) {
  //     console.log(parseInt(buffer.toString('hex'), 16).toString().substr(0, 6));
  //   });
};

// async function tt(req, res) {
//   console.log("mc\n");
// }

const verifyOTP = async (req, res) => {
  console.log(req.cookies);
  const { OTP_TOKEN } = req.cookies;
  const OTP_RCVD = req.body.OTP;

  function setVerified(req, res) {
    res.json({
      msg: "VERIFIED",
    });
  }

  if (OTP_TOKEN) {
    const verify_token = crypto
      .createHash("sha256")
      .update(OTP_RCVD.toString())
      .digest("hex");

    verify_token === OTP_TOKEN
      ? setVerified(req, res)
      : res.status(404).json({
          msg: " wrong OTP provided",
        });
  } else {
    res.status(404).json({
      msg: "TIME_OUT",
      receivedCookie: req.cookies,
    });
  }
};

// module.exports = { verifyEssentialDetail, verifyOTP };
module.exports = { verifyEssentialDetail, verifyOTP };
