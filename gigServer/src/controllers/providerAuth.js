const ProviderAuthModel = require("../models/ProviderAuth");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");

const registerProvider = async (req, res) => {
  try {
    const auth = await ProviderAuthModel.findOne({ email: req.body.email });
    if (auth) {
      return res.status(400).json({ status: "error", msg: "duplicate email" });
    }

    const hash = await bcrypt.hash(req.body.password, 12);
    await ProviderAuthModel.create({
      name: req.body.name,
      profilePic: req.body.profilePic,
      biography: req.body.biography,
      phoneNumber: req.body.phoneNumber,
      email: req.body.email,
      hash,
    });

    res.json({ status: "ok", msg: "provider created" });
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ status: "error", msg: "invalid registration" });
  }
};

const loginProvider = async (req, res) => {
  try {
    const auth = await ProviderAuthModel.findOne({ email: req.body.email });
    if (!auth) {
      return res.status(400).json({ status: "error", msg: "login error" });
    }

    const result = await bcrypt.compare(req.body.password, auth.hash);
    if (!result) {
      // Some security logs, not important for mvp
      console.error("password error login attempt: " + auth.email);
      return res.status(401).json({ status: "error", msg: "login failed" });
    }

    const claims = { email: auth.email, role: "provider", id: auth.id };
    const access = jwt.sign(claims, process.env.ACCESS_SECRET, {
      expiresIn: "20m",
      jwtid: uuidv4(),
    });
    const refresh = jwt.sign(claims, process.env.REFRESH_SECRET, {
      expiresIn: "30d",
      jwtid: uuidv4(),
    });

    res.json({ access, refresh });
  } catch (error) {
    console.error(error.message);
    return res.status(400).json({ status: "error", msg: "login failed" });
  }
};

const refreshProvider = async (req, res) => {
  try {
    const claims = {
      email: req.decoded.email,
      role: req.decoded.role,
      id: req.decoded.id,
    };
    const access = jwt.sign(claims, process.env.ACCESS_SECRET, {
      expiresIn: "20m",
      jwtid: uuidv4(),
    });
    res.json({ access });
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ status: "error", msg: "refreshing token failed" });
  }
};

const patchProvider = async (req, res) => {
  try {
    // Double check if profile exist and matches
    if (req.decoded.id != req.params.id) {
      return res
        .status(400)
        .json({ status: "error", msg: "error finding profile to patch" });
    } else {
      // Create what data to update.
      const updateProfile = {};
      if ("name" in req.body) updateProfile.name = req.body.name;
      //  if ("profilePic" in req.body) updateProfile.profilePic = req.body.profilePic,
      if ("biography" in req.body) updateProfile.biography = req.body.biography;
      if ("phoneNumber" in req.body)
        updateProfile.phoneNumber = req.body.phoneNumber;

      // Check if email in patch body, if email is new and if new email already exist in database
      if ("email" in req.body) {
        if (req.decoded.email != req.body.email) {
          const isSameEmailExist = await ProviderAuthModel.findOne({
            email: req.body.email,
          });
          if (isSameEmailExist) {
            return res
              .status(400)
              .json({ status: "error", msg: "duplicate email" });
          } else {
            updateProfile.email = req.body.email;
          }
        }
      }

      if ("password" in req.body)
        updateProfile.hash = await bcrypt.hash(req.body.password, 12);
      // Finally update the profile
      await ProviderAuthModel.findByIdAndUpdate(req.params.id, updateProfile);
      res.status(200).json({ status: "ok", msg: "profile updated" });
    }
  } catch (error) {
    console.error(error.message);
    return res.status(400).json({ status: "error", msg: "patch failed" });
  }
};

module.exports = {
  registerProvider,
  loginProvider,
  refreshProvider,
  patchProvider,
};
