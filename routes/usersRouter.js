var express = require("express");
var router = express.Router();
const User = require("../models/userModel");
const { getUserList, createUser, updateUser } = require("../controllers/userController");

/* GET users listing. */
router.route("/")
.get(getUserList)
.post(createUser)
.patch(updateUser)

module.exports = router

