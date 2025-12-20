const mongoose = require("mongoose");

// create schema
const userModel = mongoose.Schema(
  {
    // id is auto-assigned
    name: {
      type: String,
      required: false,
      default: "",
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"], // check that submitted email is valid email
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      maxlength: 128,
    },
  },
  { timestamps: true }
);

// export schema instance
module.exports = mongoose.model("User", userModel);
