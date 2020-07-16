var express = require("express");
var router = express.Router();
const { getUserList, createUser, updateUser, createUserAdmin } = require("../controllers/userController");
const { loginRequired, adminRequired } = require("../middleware/auth");
const { loginWithEmail } = require("../controllers/authController");

/* GET users listing. */
router.route("/")
.get( getUserList)
.post(createUser)
.patch(loginRequired, adminRequired, updateUser)

router.route("/admin")
.post(createUserAdmin)

module.exports = router

