const Kennel = require("../models/kennelModel");
// const { JsonWebTokenError } = require("jsonwebtoken");
// const AppError = require("../utils/appError");
// const catchAsync = require("../utils/catchAsync");
// const jwt = require("jsonwebtoken");

exports.createKennel = async (req, res, next) => {
  try {
    const { email, name, phone, since, images, slogan, desc } = req.body;
    console.log(email, name, phone, since, images, slogan, desc)
    if (!email || !name || !phone || !since || !images || !slogan || !desc) {
      return res.status(401).json({
        status: "fail",
        message: "Missing somethingsss",
      });
    }

    const kennel = await Kennel.create({
      email, 
      name , 
      phone,
      since, 
      images, 
      slogan, 
      desc,
      user: req.user
    });

    res.status(201).json({ status: "success", data: kennel });
  } catch (err) {
    res.status(401).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.getKennelList = async (req, res, next) => {
  try {
    const kennel = await Kennel.find({});
    res.status(201).json({ status: "success", data: kennel });
  } catch (err) {
    res.status(401).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.updateKennel = async (req, res, next) => {
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
  const kennel = await Kennel.findOne({ _id: decoded._id, tokens: token });
  console.log(kennel);
  if (!kennel) {
    return res.status(401).json({ status: "fail", error: "Unauthorized 2" });
  }

  if (req.body.name) {
    kennel.name = req.body.name;
  }
  if (req.body.phone) {
    kennel.phone = req.body.phone;
  }
  if (req.body.email) {
    kennel.email = req.body.email;
  }

  await kennel.save();

  res.status(200).json({
    status: "success",
    data: kennel,
  });
};