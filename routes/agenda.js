const router = require("express").Router();

//Controller Functions
const {
  addAgenda,
  getAgendas,
  getAgenda,
  registerAgenda,
  getRegisteredAgendas,
  getRegisteredAgenda,
  deleteAgenda,
  editAgenda,
} = require("../controllers/agenda");

//Middlewares
const verifyUser = require("../middlewares/verifyUser");

//routes
router.route("/add-agenda").post(addAgenda);
router.route("/get-agendas").get(getAgendas);
router.route("/get-agenda/:id").get(getAgenda);

router.route("/register-agenda").post(verifyUser, registerAgenda);
router.route("/get-registered-agendas").get(getRegisteredAgendas);
router.route("/get-registered-agenda/:id").get(getRegisteredAgenda);

router.route("/delete/:id").delete(deleteAgenda);
router.route("/edit/:id").put(editAgenda);

module.exports = router;
