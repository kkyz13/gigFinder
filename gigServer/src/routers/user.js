const express = require("express");
const { getProfile } = require("../controllers/user");
const { validateParamId } = require("../validators/user");
const { errorCheck } = require("../validators/errorCheck");
const router = express.Router();

router.post("/u/:id", validateParamId, errorCheck, getProfile);

module.exports = router;
