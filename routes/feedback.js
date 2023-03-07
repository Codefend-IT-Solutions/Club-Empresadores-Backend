const router = require("express").Router();

//Controller
const {
  addFeedback,
  getFeedbacks,
  deleteFeedback,
} = require("../controllers/feedback");

//middlewares
const verifyUser = require("../middlewares/verifyUser");

//routes
router.route("/add-feedback").post(verifyUser, addFeedback);
router.route("/get-feedback").get(getFeedbacks);
router.route("/delete/:id").delete(deleteFeedback);

module.exports = router;
