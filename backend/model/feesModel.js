const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    currentSession: {
      type: String,
      required: true,
    },

    feesType: {
      type: String,
      enum: ["hosteller", "nonhosteller", "feewaiver", "extra"],
      required: true,
    },

    feesdata: {
      1: { type: Number, required: true },
      2: { type: Number, required: true },
      3: { type: Number, required: true },
      4: { type: Number, required: true },
    },
  },
  { collection: "feesModelCapstone" }
);
schema.index({ currentSession: 1, feesType: 1 }, { unique: true });

const feesModel = mongoose.model("feesStructure", schema);

module.exports = feesModel;
