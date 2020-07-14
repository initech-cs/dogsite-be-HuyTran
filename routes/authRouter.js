var express = require("express");
const { loginWithEmail } = require("../controllers/authController");
var router = express.Router();

router.route("/login")
.post(loginWithEmail)

module.exports = router