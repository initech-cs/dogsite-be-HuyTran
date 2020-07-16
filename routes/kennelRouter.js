const { getKennelList, createKennel, updateKennel } = require("../controllers/kennelController");
const { loginRequired, kennelRequired } = require("../middleware/auth");
const Purebred = require("../models/purebredModel");
const purebredRouter = require("./purebredRouter")

const router = require("express").Router();

router.route("/kennels")
.get(getKennelList)
.post(loginRequired, createKennel)
.patch(kennelRequired, updateKennel)

router.use("/kennels/:kennelId/purebred/", purebredRouter)


module.exports = router;
