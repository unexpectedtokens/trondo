const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const Task = require("./Task");
const jwt = require("jsonwebtoken");
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      unique: true,
      type: String,
      required: true,
      trim: true,
      validate(value) {
        if (!validator.isEmail) {
          throw new Error("Email is not a valid email");
        }
      }
    },
    avatar: {
      type: Buffer
    },
    password: {
      required: true,
      type: String,
      trim: true,
      validate(value) {
        if (value.toLowerCase().includes("password")) {
          throw new Error("Password can't contain the word password");
        }
      },
      minLenght: 7
    },
    tokens: [
      {
        token: {
          type: String,
          required: true
        }
      }
    ],
    background: {
      default: "#dcedff",
      type: String
    }
  },
  {
    timestamps: true
  }
);

userSchema.virtual("tasks", {
  ref: "Task",
  localField: "_id",
  foreignField: "Owner"
});
userSchema.virtual("projects", {
  ref: "Project",
  localField: "_id",
  foreignField: "Owner"
});

userSchema.methods.genAuthToken = async function() {
  const user = this;
  const token = await jwt.sign(
    { _id: user._id.toString() },
    "jsonsecretveryverysecret"
  );
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};
userSchema.methods.toJSON = function() {
  const user = this;
  const userObj = user.toObject();
  delete userObj.password;
  delete userObj.tokens;
  delete userObj.avatar;
  return userObj;
};
userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("Unable to login");
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Unable to login");
  }
  return user;
};

userSchema.pre("save", async function(next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

userSchema.pre("remove", async function(next) {
  const user = this;
  await Task.deleteMany({ Owner: user._id });
  next();
});

const User = mongoose.model("User", userSchema);
module.exports = User;
