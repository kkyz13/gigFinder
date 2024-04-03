const express = require("express");
const {
  registerProvider,
  loginProvider,
  refreshProvider,
  patchProvider,
} = require("../controllers/providerAuth");
const {
  validateRegistrationData,
  validateParamId,
} = require("../validators/userAuth");
const { errorCheck } = require("../validators/errorCheck");

const router = express.Router();

router.put("/register", validateRegistrationData, errorCheck, registerProvider);
router.post("/login", errorCheck, loginProvider);
router.post("/refresh", errorCheck, refreshProvider);
//Validate for patch user data does not work... yet.
router.patch("/:id", validateParamId, errorCheck, patchProvider);

module.exports = router;
