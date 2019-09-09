const mongoose = require("mongoose");
const dTaskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      minLength: 10
    },
    Owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User"
    },
    completed: { type: Boolean, default: false }
  },
  {
    timestamps: true
  }
);
const dTask = mongoose.model("dailytask", dTaskSchema);
module.exports = dTask;
