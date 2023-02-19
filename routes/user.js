const router = require("express").Router();

//controllers
const { userSignup, userLogin } = require("../controllers/user");

//routes
router.route("/signup").post(userSignup);
router.route("/login").post(userLogin);

module.exports = router;
