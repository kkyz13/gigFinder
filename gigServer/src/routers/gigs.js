const express = require("express");
const {
  getAllUsersOfGig,
  putUserInGig,
  deleteUserInGig,
} = require("../controllers/gigsUserMod");
const {
  addGigForProvider,
  getAllGigs,
  getGigById,
  deleteGigForProvider,
  updateGigForProvider,
  getAllGigsByDate,
} = require("../controllers/gigs");
const {
  validateAddGigData,
  validateUpdateGigData,
  validateIdInParams,
  validateProviderIdInParams,
} = require("../validators/gigs");
const { errorCheck } = require("../validators/errorCheck");
const { authUserProvider } = require("../middleware/auth");
const router = express.Router();

router.get("/gigs", getAllGigs);
router.post(
  "/gigs/:id",
  authUserProvider,
  validateIdInParams,
  errorCheck,
  getGigById
);
router.put(
  "/gigs/p/:providerId",
  authUserProvider,
  validateAddGigData,
  validateProviderIdInParams,
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
router.get("/gigs/sortdate", getAllGigsByDate);

router.get(
  "/gigs/usermod/:id",
  authUserProvider,
  validateIdInParams,
  getAllUsersOfGig
);
router.put(
  "/gigs/usermod/:id",
  authUserProvider,
  validateIdInParams,
  putUserInGig
);
router.delete(
  "/gigs/usermod/:id",
  authUserProvider,
  validateIdInParams,
  deleteUserInGig
);

module.exports = router;
