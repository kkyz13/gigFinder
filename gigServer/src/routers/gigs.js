const express = require("express");
const { addGigForProvider } = require("../controllers/gigs");
const { validateAddGigData } = require("../validators/gigs");
const { errorCheck } = require("../validators/errorCheck");
const router = express.Router();

router.put(
  "/gigs/p/:providerId",
  validateAddGigData,
  errorCheck,
  addGigForProvider
);

module.exports = router;
