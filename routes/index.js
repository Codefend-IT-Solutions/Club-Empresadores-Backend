const router = require("express").Router();

//paths
const user = require("./user");
const agenda = require("./agenda");
const feedback = require("./feedback");

//routes
router.use("/user", user);
router.use("/agenda", agenda);
router.use("/feedback", feedback);

module.exports = router;
