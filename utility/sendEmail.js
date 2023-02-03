// const nodemailer = require("nodemailer");

// const sendEmail = (options) => {
//   let transporter = nodemailer.createTransport({
//     service: process.env.EMAIL_SERVICE,
//     auth: {
//       user: process.env.EMAIL_USERNAME,
//       pass: process.env.EMAIL_PASSWORD,
//     },
//   });

//   const mailOptions = {
//     from: process.env.EMAIL_FROM,
//     to: options.to,
//     subject: options.subject,
//     html: options.text,
//   };

//   transporter.sendMail(mailOptions, function (err, info) {
//     if (err) {
//       console.log("err from email", err);
//     } else {
//       console.log("email send info ", info);
//     }
//   });
// };

// module.exports = sendEmail;

const nodemailer = require("nodemailer");
// var smtpTransport = require("nodemailer-smtp-transport");

const sendEmail = (options) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    // service: process.env.EMAIL_SERVICE,
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
