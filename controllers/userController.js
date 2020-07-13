const User = require("../models/userModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

exports.createUser = catchAsync(async (req, res, next) => {
  const { email, name, password, phone, type } = req.body;
  console.log(req.body);
  if (!email || !name || !password || !phone || !type) {
    return next(new AppError(400, "Something information missing"));
  }

  const user = await User.create({
    email: email,
    name: name,
    password: password,
    phone: phone,
    type: type || "guess",
  });

  res.status(201).json({ status: "success", data: user });
});

exports.getUserList = catchAsync(async (req, res, next) => {
  const user = await User.find({});
  console.log(user)
  res.status(201).json({ status: "success", data: user });
});

exports.updateUser = catchAsync(async (req, res, next) => { 
    console.log(req.query.id) // http://localhost:5000/users?id=...(id from query)
    let oldUser = await User.findById(req.query.id)
    console.log(oldUser)

    if(req.body.name){
        oldUser.name = req.body.name
    }
    if(req.body.email){
        oldUser.email = req.body.email
    }

    oldUser.save()

    res.status(200).json({
        status: "success",
        data: oldUser
    })            
})