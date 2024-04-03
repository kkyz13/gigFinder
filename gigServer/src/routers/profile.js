const express = require("express");
const {
  getProfileUser,
  getProfileProvider,
} = require("../controllers/profile");
const { validateParamId } = require("../validators/profile");
const { errorCheck } = require("../validators/errorCheck");
const router = express.Router();

router.post("/u/:id", validateParamId, errorCheck, getProfileUser);
router.post("/p/:id", validateParamId, errorCheck, getProfileProvider);

module.exports = router;
