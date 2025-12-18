const mongoose = require("mongoose");

// create schema
const userModel = mongoose.Schema(
  {
    // id is auto-assigned
    email: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

// export schema instance
module.exports = mongoose.model("User", userModel);
