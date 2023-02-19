const router = require("express").Router();

//Controller
const { addFeedback, getFeedbacks } = require("../controllers/feedback");

//middlewares
const verifyUser = require("../middlewares/verifyUser");

//routes
router.route("/add-feedback").post(verifyUser, addFeedback);
router.route("/get-feedback").get(getFeedbacks);

module.exports = router;
