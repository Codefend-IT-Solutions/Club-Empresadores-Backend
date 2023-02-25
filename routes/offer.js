const router = require("express").Router();

//controller functions
const {
  createOffer,
  getAllOffers,
  getSpecificOffer,
  getUserOffers,
} = require("../controllers/offer");

//Middlewares
const verifyUser = require("../middlewares/verifyUser");

//routes
router.route("/create-offer").post(verifyUser, createOffer);
router.route("/get-all-offers").get(getAllOffers);
router.route("/get-specific-offer/:id").get(getSpecificOffer);
router.route("/get-user-offer").get(verifyUser, getUserOffers);

module.exports = router;
