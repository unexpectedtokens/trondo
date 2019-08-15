const mongoose = require("mongoose");
const projectTaskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      minLength: 10
    },
    in: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Project"
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
const ProjectTask = mongoose.model("Projecttask", projectTaskSchema);
module.exports = ProjectTask;
