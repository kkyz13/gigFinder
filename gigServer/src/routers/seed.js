const express = require("express");
const router = express.Router();

const { seedGigs, seedUser, seedProvider } = require("../controllers/seed");

router.put("/gigs/seed", seedGigs);
router.put("/auth/u/seed", seedUser);
router.put("/auth/p/seed", seedProvider);

module.exports = router;
