const express = require("express");
const {
  registerProvider,
  loginProvider,
  refreshProvider,
  patchProvider,
} = require("../controllers/providerAuth");
const {
  validateRegistrationData,
  validateLoginData,
  validatePatchData,
  validateParamId,
} = require("../validators/userAuth");
const { errorCheck } = require("../validators/errorCheck");
const { authUserProvider, authRefresh } = require("../middleware/auth");

const router = express.Router();

router.put("/register", validateRegistrationData, errorCheck, registerProvider);
router.post("/login", validateLoginData, errorCheck, loginProvider);
router.post("/refresh", authRefresh, errorCheck, refreshProvider);
router.patch(
  "/:id",
  authUserProvider,
  validateParamId,
  validatePatchData,
  errorCheck,
  patchProvider
);

module.exports = router;
