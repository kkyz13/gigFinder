const express = require("express");
const { registerUser } = require("../controllers/userAuth");
const { validateRegistrationData } = require("../validators/userAuth");
const { errorCheck } = require("../validators/errorCheck");
const router = express.Router();

router.put("/u/register", validateRegistrationData, errorCheck, registerUser);

module.exports = router;
