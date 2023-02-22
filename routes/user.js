const router = require("express").Router();

//controllers
const {
  userSignup,
  userLogin,
  addProfileImage,
  userInfo,
  editProfile,
  changePassword,
  deleteAccount,
} = require("../controllers/user");

//Middlewares
const verifyUser = require("../middlewares/verifyUser");

//routes
router.route("/signup").post(userSignup);
router.route("/login").post(userLogin);

router.route("/profile-image").put(verifyUser, addProfileImage);
router.route("/whoami").get(verifyUser, userInfo);
router.route("/edit-profile").put(verifyUser, editProfile);
router.route("/change-password").put(verifyUser, changePassword);
router.route("/delete-account").delete(verifyUser, deleteAccount);

module.exports = router;
