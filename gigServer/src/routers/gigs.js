const express = require("express");
const {
  addGigForProvider,
  getAllGigs,
  getGigById,
  deleteGigForProvider,
  updateGigForProvider,
} = require("../controllers/gigs");
const {
  validateAddGigData,
  validateUpdateGigData,
} = require("../validators/gigs");
const { errorCheck } = require("../validators/errorCheck");
const { validateIdInParams } = require("../validators/gigs");
const { validateProviderIdInParams } = require("../validators/gigs");
const router = express.Router();

router.get("/gigs", getAllGigs);
router.post("/gigs/:id", validateIdInParams, errorCheck, getGigById);
router.put(
  "/gigs/p/:providerId",
  validateAddGigData,
  errorCheck,
  addGigForProvider
);
router.delete(
  "/gigs/:providerId/:id",
  validateProviderIdInParams,
  validateIdInParams,
  errorCheck,
  deleteGigForProvider
);
router.patch(
  "/gigs/:id",
  validateUpdateGigData,
  errorCheck,
  updateGigForProvider
);

module.exports = router;
