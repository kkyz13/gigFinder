const express = require("express");
const {
  getProfileUser,
  getProfileProvider,
} = require("../controllers/profile");
const { validateParamId } = require("../validators/profile");
const { errorCheck } = require("../validators/errorCheck");
const router = express.Router();
const { authUserProvider } = require("../middleware/auth");

router.post(
  "/u/:id",
  authUserProvider,
  validateParamId,
  errorCheck,
  getProfileUser
);
router.post(
  "/p/:id",
  authUserProvider,
  validateParamId,
  errorCheck,
  getProfileProvider
);

module.exports = router;
