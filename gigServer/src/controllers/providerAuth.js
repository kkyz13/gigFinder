const ProviderAuthModel = require("../models/ProviderAuth");
const bcrypt = require("bcrypt");

const registerProvider = async (req, res) => {
  try {
    const auth = await ProviderAuthModel.findOne({ email: req.body.email });
    if (auth) {
      return res.status(400).json({ status: "error", msg: "duplicate email" });
    }

    const hash = await bcrypt.hash(req.body.password, 12);
    await ProviderAuthModel.create({
      name: req.body.email,
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

module.exports = { registerProvider };
