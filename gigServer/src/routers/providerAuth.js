const express = require("express");
const { registerProvider } = require("../controllers/providerAuth");
const { validateRegistrationData } = require("../validators/userAuth");
const { errorCheck } = require("../validators/errorCheck");

const router = express.Router();

router.put("/register", validateRegistrationData, errorCheck, registerProvider);

module.exports = router;
