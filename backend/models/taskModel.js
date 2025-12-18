const mongoose = require("mongoose");

// create schema
const taskSchema = mongoose.Schema(
  {
    // no need to create id/taskId, it'll be auto-assigned
    userId: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    isFinished: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// export schema instance
module.exports = mongoose.model("Task", taskSchema);
