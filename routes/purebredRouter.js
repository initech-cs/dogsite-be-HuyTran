const { createPurebred } = require("../controllers/purebredController")

const router = require("express").Router({mergeParams: true})

router.route("/")
.post(createPurebred)

module.exports = router