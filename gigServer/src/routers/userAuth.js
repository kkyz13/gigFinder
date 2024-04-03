const express = require("express");
const {
  registerUser,
  loginUser,
  refreshUser,
  patchUser,
} = require("../controllers/userAuth");
const {
  validateRegistrationData,
  validatePatchData,
  validateParamId,
} = require("../validators/userAuth");
const { errorCheck } = require("../validators/errorCheck");
const router = express.Router();

router.put("/register", validateRegistrationData, errorCheck, registerUser);
router.post("/login", errorCheck, loginUser);
router.get("/refresh", errorCheck, refreshUser);
//Validate for patch user data does not work... yet.
router.patch("/:id", validateParamId, validatePatchData, errorCheck, patchUser);

module.exports = router;
