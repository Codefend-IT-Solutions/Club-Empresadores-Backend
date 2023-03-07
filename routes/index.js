const router = require("express").Router();

//paths
const admin = require("./admin");
const user = require("./user");
const agenda = require("./agenda");
const feedback = require("./feedback");
const offer = require("./offer");
const upload = require("./upload");

//routes
router.use("/admin", admin);
router.use("/user", user);
router.use("/agenda", agenda);
router.use("/feedback", feedback);
router.use("/offer", offer);
router.use("/upload", upload);

module.exports = router;
