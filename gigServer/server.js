require("dotenv").config();
const express = require("express");
const connectDB = require("./src/db/db");

//SAFEGUARDS
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const userAuth = require("./src/routers/userAuth");
const profile = require("./src/routers/profile");
const providerAuth = require("./src/routers/providerAuth");
const gigs = require("./src/routers/gigs");
const seed = require("./src/routers/seed");

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

connectDB();
const app = express();
app.use(cors());
app.use(helmet());
app.use(limiter);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/auth/u", userAuth);
app.use("/profile", profile);
app.use("/auth/p", providerAuth);
app.use("/api", gigs);
app.use("/api", seed);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
