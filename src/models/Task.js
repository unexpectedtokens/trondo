const mongoose = require("mongoose");
const taskSchema = new mongoose.Schema(
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
    due: {
      type: String
    },
    kind: {
      type: String
    },
    completed: Boolean,
    default: false
  },
  {
    timestamps: true
  }
);
const Task = mongoose.model("Task", taskSchema);
module.exports = Task;
