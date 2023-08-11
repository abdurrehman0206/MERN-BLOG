const User = require("../model/userModel");
const JWT = require("jsonwebtoken");
const validator = require("validator");

const generateToken = (email, id) => {
  const token = JWT.sign({ email, id }, process.env.SECRET, {
    expiresIn: "1d",
  });
  return token;
};
const signup = async (req, res) => {
  const { email, password, fullname, username } = req.body;
  const emptyInputs = [];
  if (!email) {
    emptyInputs.push("email");
  }
  if (!password) {
    emptyInputs.push("password");
  }
  if (!fullname) {
    emptyInputs.push("fullname");
  }
  if (!username) {
    emptyInputs.push("username");
  }
  if (emptyInputs.length > 0) {
    return res.status(400).json({
      success: false,
      message: "Empty inputs",
      error: "Please fill in all the required fields",
      emptyInputs,
    });
  }
  if (!validator.isEmail(email)) {
    return res.status(400).json({
      success: false,
      message: "Invalid email",
      error: "Please enter a valid email",
    });
  }
  try {
    const user = await User.signup(email, password, fullname, username);
    const token = generateToken(user.email, user._id);
    const userPayload = {
      id: user._id,
      email: user.email,
      fullname: user.fullname,
      username: user.username,
      token,
    };
    return res.status(201).json({
      success: true,
      message: "User created successfully",
      user: userPayload,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};
const login = async (req, res) => {
  const { email, password } = req.body;
  const emptyInputs = [];
  if (!email) {
    emptyInputs.push("email");
  }
  if (!password) {
    emptyInputs.push("password");
  }

  if (emptyInputs.length > 0) {
    return res.status(400).json({
      success: false,
      message: "Empty inputs",
      error: "Please fill in all the required fields",
      emptyInputs,
    });
  }
  if (!validator.isEmail(email)) {
    return res.status(400).json({
      success: false,
      message: "Invalid email",
      error: "Please enter a valid email",
    });
  }
  try {
    const user = await User.login(email, password);
    const token = generateToken(user.email, user._id);
    const userPayload = {
      id: user._id,
      email: user.email,
      fullname: user.fullname,
      username: user.username,
      token,
    };
    return res.status(200).json({
      success: true,
      message: "User logged in successfully",
      user: userPayload,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};
const verifyToken = async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Invalid token",
      error: "Please provide a valid token",
    });
  }
  try {
    const { id, email } = JWT.verify(token, process.env.SECRET);
    const user = await User.findById({ _id: id, email });
    console.log("🚀 ~ file: userController.js:123 ~ verifyToken ~ user:", user);
    const userPayload = {
      id: user._id,
      email: user.email,
      fullname: user.fullname,
      username: user.username,
      token,
    };
    return res.status(200).json({
      success: true,
      message: "Token verified successfully",
      user: userPayload,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};
module.exports = {
  signup,
  login,
  verifyToken,
};
