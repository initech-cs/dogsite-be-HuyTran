var express = require("express");
const { loginWithEmail, loginFacebook } = require("../controllers/authController");
var router = express.Router();

router.route("/login").post(loginWithEmail)
router.route("/facebook/login").get(loginFacebook)

module.exports = router