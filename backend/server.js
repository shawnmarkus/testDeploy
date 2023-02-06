const express = require("express");
// const mongoose = require("mongoose");
const dotenv = require("dotenv");
const routes = require("./control/routes");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
const { none } = require("./utility/multer");

// for verification of token
// const verifyToken = require("./utility/verifyToken");

// -----------------------------------------------------------
// to test
// const postData = require("./post");
// -----------------------------------------------------------

// putting the env variables
dotenv.config({ path: "./constant/secrets/config.env" });

// creating connection to DB
try {
  require("./control/connectDB");
} catch (error) {
  console.log("error hai bro", error);
}

// console.log(process.env.EMAIL_SERVICE);
// creating express instance
var app = express();

// using necessary tools
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(
  cors({
    origin: process.env.ORIGIN,
    credentials: true,
  })
);

// embedding routes
app.use(routes);

// home page
app.get("/", (req, res) => res.send("hello boy"));

// // test post
// app.use("/post", verifyToken, postData);

// listening port
app.listen(process.env.PORT, (error) => {
  if (error) {
    console.log(`failed to listen because ${error}`);
  } else {
    console.log(`listening at ${process.env.PORT}`);
  }
});
