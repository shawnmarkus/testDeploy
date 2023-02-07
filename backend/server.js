const express = require("express");
// const mongoose = require("mongoose");
const dotenv = require("dotenv");
const routes = require("./control/routes");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");

// for verification of token

// putting the env variables
dotenv.config({ path: "./constant/secrets/config.env" });

// creating connection to DB
try {
  require("./control/connectDB");
} catch (error) {
  console.log("error hai bro", error);
}

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

// listening port
app.listen(process.env.PORT, (error) => {
  if (error) {
    console.log(`failed to listen because ${error}`);
  } else {
    console.log(`listening at ${process.env.PORT}`);
  }
});
