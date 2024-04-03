const express = require("express");
const {
  addGigForProvider,
  getAllGigs,
  getGigById,
} = require("../controllers/gigs");
const { validateAddGigData } = require("../validators/gigs");
const { errorCheck } = require("../validators/errorCheck");
const router = express.Router();

router.get("/gigs", getAllGigs);
router.post("/gigs/:id", getGigById);
router.put(
  "/gigs/p/:providerId",
  validateAddGigData,
  errorCheck,
  addGigForProvider
);

module.exports = router;
