const mongoose = require("mongoose");
const userModel = require("./userModel");

const schema = mongoose.Schema(
  {
    pendingRequestQueue: {
      type: [mongoose.Schema.Types.ObjectId],
      unique: true,
      ref: userModel,
    },
  },
  { collection: "pendingQueueCapstone" }
);

const pendingRequestModel = mongoose.model("pendingQueue", schema);

module.exports = pendingRequestModel;
