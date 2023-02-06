const User = require("../models/userSchema");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const gernateToken = require("../utils/gernateToken");

/* Register User */
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const userExist = await User.findOne({ email });
  if (userExist) {
    res.status(401);
    throw new Error("User Already Exist, Please Try new Email");
  }
  const user = await User.create({
    name,
    email,
    password,
  });
  if (user) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: gernateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("User Not Created");
  }
});

/* Login Controller or Authentication and Authorization */
const authController = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const userData = await User.findOne({ email });
  if (!userData) {
    throw new Error("INVALID EMAIL");
  }

  if (userData && (await userData.matchPassword(password))) {
    res.status(200).json({
      _id: userData._id,
      name: userData.name,
      email: userData.email,
      isAdmin: userData.isAdmin,
      token: gernateToken(userData._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid Password", 401);
  }
});

const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) {
    res.status(401);
    throw new Error("User Not Found");
  }
  res.status(200).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
  });
});

const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(404);
    throw new Error("User Not Found");
  }
  user.name = req.body.name || user.name;
  user.email = req.body.email || user.email;
  if (req.body.password) {
    user.password = req.body.password;
  }
  const updateUser = await user.save();
  res.status(200).json({
    _id: updateUser._id,
    name: updateUser.name,
    email: updateUser.email,
    isAdmin: updateUser.isAdmin,
    token: gernateToken(updateUser._id),
  });
});

module.exports = {
  authController,
  getUserProfile,
  registerUser,
  updateUserProfile,
};
