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
const { authUserProvider } = require("../middleware/auth");
const router = express.Router();

router.get("/gigs", getAllGigs);
router.post("/gigs/:id", validateIdInParams, errorCheck, getGigById);
router.put(
  "/gigs/p/:providerId",
  authUserProvider,
  validateAddGigData,
  validateIdInParams,
  errorCheck,
  addGigForProvider
);
router.delete(
  "/gigs/:id",
  authUserProvider,
  validateIdInParams,
  errorCheck,
  deleteGigForProvider
);
router.patch(
  "/gigs/:id",
  authUserProvider,
  validateUpdateGigData,
  errorCheck,
  updateGigForProvider
);

module.exports = router;
