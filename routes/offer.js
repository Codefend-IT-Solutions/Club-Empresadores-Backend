const router = require("express").Router();

//controller functions
const {
  createOffer,
  getAllOffers,
  getSpecificOffer,
  getUserOffers,
  deleteOffer,
  editOffer,
} = require("../controllers/offer");

//Middlewares
const verifyUser = require("../middlewares/verifyUser");

//routes
router.route("/create-offer").post(verifyUser, createOffer);
router.route("/get-all-offers").get(getAllOffers);
router.route("/get-specific-offer/:id").get(getSpecificOffer);
router.route("/get-user-offer").get(verifyUser, getUserOffers);

router.route("/delete/:id").delete(deleteOffer);
router.route("/edit/:id").put(editOffer);

module.exports = router;
