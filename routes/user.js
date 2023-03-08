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
  getAllUsers,
  getSpecificUser,
  deleteSpecificAccount,
  editSpecificUser,
} = require("../controllers/user");

//Middlewares
const verifyUser = require("../middlewares/verifyUser");

//routes
router.route("/signup").post(userSignup);
router.route("/login").post(userLogin);

router.route("/profile-image").put(verifyUser, addProfileImage);
router.route("/whoami").get(verifyUser, userInfo);
router.route("/edit-profile").put(verifyUser, editProfile);
router.route("/edit-specific-profile/:id").put(editSpecificUser);
router.route("/change-password").put(verifyUser, changePassword);
router.route("/delete-account").delete(verifyUser, deleteAccount);
router.route("/delete-specific-account/:id").delete(deleteSpecificAccount);

router.route("/get-all-users").get(getAllUsers);
router.route("/get-specific-user/:id").get(getSpecificUser);

module.exports = router;
