var express = require("express");
var router = express.Router();
const User = require("../models/userModel");
const { getUserList, createUser, updateUser } = require("../controllers/userController");
const { hostRequired, loginRequired } = require("../middleware/auth");

/* GET users listing. */
router.route("/")
.get(getUserList)
.post(createUser)
.patch(loginRequired, updateUser)

module.exports = router
