const UserAuthModel = require("../models/UserAuth");
const bcrypt = require("bcrypt");

const registerUser = async (req, res) => {
  try {
    const auth = await UserAuthModel.findOne({ email: req.body.email });
    if (auth) {
      return res.status(400).json({ status: "error", msg: "duplicate email" });
    }

    const hash = await bcrypt.hash(req.body.password, 12);
    await UserAuthModel.create({
      name: req.body.email,
      biography: req.body.biography,
      phoneNumber: req.body.phoneNumber,
      email: req.body.email,
      hash,
    });

    res.json({ status: "ok", msg: "user created" });
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ status: "error", msg: "invalid registration" });
  }
};

module.exports = { registerUser };
