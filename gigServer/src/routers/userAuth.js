const express = require("express");
const {
  registerUser,
  loginUser,
  refreshUser,
  patchUser,
} = require("../controllers/userAuth");
const {
  validateRegistrationData,
  validateParamId,
} = require("../validators/userAuth");
const { errorCheck } = require("../validators/errorCheck");
const { authUserProvider, authRefresh } = require("../middleware/auth");
const router = express.Router();

router.put("/register", validateRegistrationData, errorCheck, registerUser);
router.post("/login", errorCheck, loginUser);
router.post("/refresh", authRefresh, errorCheck, refreshUser);
//Validate for patch user data does not work... yet.
router.patch("/:id", authUserProvider, validateParamId, errorCheck, patchUser);

module.exports = router;
