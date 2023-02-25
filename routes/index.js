const router = require("express").Router();

//paths
const user = require("./user");
const agenda = require("./agenda");
const feedback = require("./feedback");
const offer = require("./offer");

//routes
router.use("/user", user);
router.use("/agenda", agenda);
router.use("/feedback", feedback);
router.use("/offer", offer);

module.exports = router;
