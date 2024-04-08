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
const { authUserProvider, authRefresh } = require("../middleware/auth");

const router = express.Router();

router.put("/register", validateRegistrationData, errorCheck, registerProvider);
router.post("/login", errorCheck, loginProvider);
router.post("/refresh", authRefresh, errorCheck, refreshProvider);
//Validate for patch user data does not work... yet.
router.patch(
  "/:id",
  authUserProvider,
  validateParamId,
  errorCheck,
  patchProvider
);

module.exports = router;
