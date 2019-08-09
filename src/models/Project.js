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
    },
    users: [
      {
        _id: {
          type: mongoose.Schema.Types.ObjectId
        }
      }
    ],
    tasks: [
      {
        title: {
          type: String,
          trim: true,
          minLength: 10
        },
        AddedBy: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "User"
        },
        due: {
          type: String
        },
        kind: {
          type: String
        }
      }
    ]
  },
  {
    timestamps: true
  }
);
const Project = mongoose.model("Project", projectSchema);
module.exports = Project;
