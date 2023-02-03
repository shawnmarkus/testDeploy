const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const randomBytes = require("randombytes");
const cryptoJs = require("crypto-js");

const subSchemaOfDoc = mongoose.Schema({
  feesAmount: { type: Number, required: true },
  status: {
    type: String,
    enum: ["verified", "failed", "pending"],
    default: "pending",
  },
  doc_url: { type: String, required: true },
});

const schema = mongoose.Schema(
  {
    RollNumber: {
      type: Number,
      required: [true, "Please provide username"],
      unique: true,
    },

    Name: {
      type: String,
      required: true,
    },

    contactNumber: {
      type: Number,
      required: true,
    },

    branch: {
      type: String,
      required: true,
    },

    batch: {
      type: String,
    },

    email: {
      type: String,
      required: [true, "Please provide email address"],
      unique: true,
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please provide a valid email",
      ],
    },

    password: {
      type: String,
      required: [true, "Please add a password"],
      minlength: 6,
    },

    address: {
      type: String,
      required: true,
    },

    studentType: {
      type: String,
      enum: ["hosteller", "nonhosteller", "feewaiver"],
      required: true,
    },

    userRole: {
      type: String,
      enum: ["admin", "student"],
      required: true,
    },

    feesDetail: {
      feesSubmittedDoc: [subSchemaOfDoc],
    },
  },
  { collection: "userModelCapstone" }
);

// this middleware works on
schema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    // it is added to ensure that the password is not changed by any "pre" middleware when the resetpswd token will be setted
    next();
  }
});

schema.methods.matchPassword = async function (password) {
  //note this keyword is not valid for arrow function
  return await bcrypt.compare(password, this.password);
};

schema.methods.getSignedToken = async function () {
  return jwt.sign(
    { _id: this._id, userRole: this.userRole, batch: this.batch },
    process.env.SECRET_TOKEN,
    {
      expiresIn: "1d",
    }
  );
};

// exporting the model
const userModel = mongoose.model("userStructure", schema);

module.exports = userModel;
