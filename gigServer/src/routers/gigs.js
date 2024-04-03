const express = require("express");
const { addGigForProvider, getAllGigs } = require("../controllers/gigs");
const { validateAddGigData } = require("../validators/gigs");
const { errorCheck } = require("../validators/errorCheck");
const router = express.Router();

router.get("/gigs", getAllGigs);
router.put(
  "/gigs/p/:providerId",
  validateAddGigData,
  errorCheck,
  addGigForProvider
);

module.exports = router;
