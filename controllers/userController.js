const User = require("../models/userModel");
const { JsonWebTokenError } = require("jsonwebtoken");
// const AppError = require("../utils/appError");
// const catchAsync = require("../utils/catchAsync");
const jwt = require("jsonwebtoken");

exports.createUser = async (req, res, next) => {
  try {
    const { email, name, password, phone, type } = req.body;
    console.log(req.body);
    if (!email || !name || !password || !phone || !type) {
      return res.status(401).json({
        status: "fail",
        message: "Missing something",
      });
    }

    const user = await User.create({
      email: email,
      name: name,
      password: password,
      phone: phone,
      type: type || "guess",
    });

    res.status(201).json({ status: "success", data: user });
  } catch (err) {
    res.status(401).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.getUserList = async (req, res, next) => {
  try {
    const user = await User.find({});
    console.log(user);
    res.status(201).json({ status: "success", data: user });
  } catch (err) {
    res.status(401).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.updateUser = async (req, res, next) => {
  // console.log(req.query.id) // http://localhost:5000/users?id=...(id from query)
  // let oldUser = await User.findById(req.query.id)

  const token = req.body.token;
  if (!token) {
    return res.status(401).json({
      status: "fail",
      message: "Error",
    });
  }

  const decoded = jwt.verify(token, process.env.SECRET);

  // decoded._id
  const user = await User.findOne({ _id: decoded._id, tokens: token });
  console.log(user);
  if (!user) {
    return res.status(401).json({ status: "fail", error: "Unauthorized 2" });
  }

  if (req.body.name) { user.name = req.body.name; }
  if (req.body.phone) { user.phone = req.body.phone; }
  if (req.body.email) { user.email = req.body.email; }
  if (req.body.password){ user.password = req.body.password }

  await user.save();

  res.status(200).json({
    status: "success",
    data: user,
  });
};
