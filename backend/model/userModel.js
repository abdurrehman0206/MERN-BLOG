const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const userSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    fullname: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profilePicture: { type: String },
  },
  { timestamps: true }
);

userSchema.statics.signup = async function (
  email,
  password,
  fullname,
  username
) {
  const user = await this.findOne({ email });
  if (user) {
    throw new Error("User already exists");
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const newUser = await this.create({
    email,
    password: hashedPassword,
    fullname,
    username,
  });
  return newUser;
};
userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (!user) {
    throw new Error("User does not exist");
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Incorrect password");
  }
  return user;
};
module.exports = mongoose.model("User", userSchema);
