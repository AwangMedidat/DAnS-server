const router = require("express").Router();
const job = require("./jobRouter");
const auth = require("./authRouter")


router.use("/job", job);
router.use("/auth", auth);

module.exports = router;
