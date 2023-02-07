const nodemailer = require("nodemailer");

const sendEmail = (options) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    secure: true,
    auth: {
      user: "mailerservice321@gmail.com",
      pass: "qqicogkjjpnobuee",
    },
  });

  console.log("the recipient email is ===> " + options.to);

  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: options.to,
    subject: options.subject,
    html: options.text,
  };

  transporter.sendMail(mailOptions, function (err, info) {
    if (err) {
      console.log("err from email service ===> ", err);
    } else {
      console.log("email sent success info ===>", info);
    }
  });
};

module.exports = sendEmail;
