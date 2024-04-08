const express = require("express");
const {
  registerUser,
  loginUser,
  refreshUser,
  patchUser,
} = require("../controllers/userAuth");
const {
  validateRegistrationData,
  validateLoginData,
  validatePatchData,
  validateParamId,
} = require("../validators/userAuth");
const { errorCheck } = require("../validators/errorCheck");
const { authUserProvider, authRefresh } = require("../middleware/auth");
const router = express.Router();

router.put("/register", validateRegistrationData, errorCheck, registerUser);
router.post("/login", validateLoginData, errorCheck, loginUser);
router.post("/refresh", authRefresh, errorCheck, refreshUser);
router.patch(
  "/:id",
  authUserProvider,
  validateParamId,
  validatePatchData,
  errorCheck,
  patchUser
);

module.exports = router;
