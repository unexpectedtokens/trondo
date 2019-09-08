const mongoose = require("mongoose");
const projectSchema = new mongoose.Schema(
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
    }
    // tasks: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Projecttask"
    //   }
    // ]
  },
  {
    timestamps: true
  }
);
projectSchema.virtual("tasks", {
  ref: "Projecttask",
  localField: "_id",
  foreignField: "in"
});
const Project = mongoose.model("Project", projectSchema);
module.exports = Project;
