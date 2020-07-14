// const AppError = require("../utils/appError");
// const catchAsync = require("../utils/catchAsync");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const passport = require("../oauth/index")

exports.loginWithEmail = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(401).json({
        status: "fail",
        message: "Wrong email & password",
      });
    }

    const user = await User.checkEmailPassword(email, password);
    console.log(user)

    if (!user) {
      return res.status(401).json({
        status: "fail",
        message: "Wrong user",
      });
    }

    const token = await user.generateToken();

    res.status(201).json({
      status: "success",
      data: {
        user: user,
        token: token,
      },
    });

    res.status(201).json({
      status: "success",
      data: user,
    });
  } catch (err) {
    res.status(401).json({
      status: "fail",
      message: err.message
    });
  }
};

exports.loginFacebook = async (req, res, next) => {
  const fbToken = req.query.token;
  if (!fbToken) {
    return res.status(401).json({ status: "failed", error: "need token" });
  }

  const data = await axios.get(`https://graph.facebook.com/me?fields=id,name,email&access_token=${fbToken}`);
  const user = await User.findOneOrCreate(data.data.email, data.data.name);
  const token = await user.generateToken();

  return res.status(200).json({ status: "success", data: { user, token } });
};