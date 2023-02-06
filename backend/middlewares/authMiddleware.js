const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const User = require("../models/userSchema");

const protected = asyncHandler(async (req, res, next) => {
  let token;
  // token = req.headers.authorization ?
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decode = jwt.verify(token, process.env.JWT_KEY);
      req.user = await User.findById(decode.id).select("-password");
      next();
    } catch (error) {
        console.log(error);
      res.status(401);
      throw new Error("Not Authorized, token Failed");
    }
  } else {
    res.status(401);
    throw new Error("Not Authorized, not token");
  }
});

const adminprotected = asyncHandler(async (req, res, next) => {
  let token;
  // token = req.headers.authorization ?
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      console.log("authooooo MiddleWare 1")
      token = req.headers.authorization.split(" ")[1];
      const decode = jwt.verify(token, process.env.JWT_KEY);
      console.log("authooooo MiddleWare 2")
      const data = await User.findById(decode.id).select("-password");
      if(!(data.isAdmin)){
        console.log("authooooo MiddleWare 4")
        res.status(401);
        throw new Error("You are Not Admin");
      }
      console.log("authooooo MiddleWare 5")
      req.user = await User.findById(decode.id).select("-password");
      console.log("user id ==" + req.user._id);
      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error("Not Authorized, token Failed");
    }
  } else {
    res.status(401);
    throw new Error("Not Authorized, not token");
  }
});

module.exports = { protected,adminprotected };
