const UserAuthModel = require("../models/UserAuth");

const getProfile = async (req, res) => {
  try {
    // Get profile data by id
    const profileDataSensitive = await UserAuthModel.findById(req.params.id);
    // Checks if null
    if (profileDataSensitive === null) {
      res.status(400).json({ status: "error", msg: "cannot find profile" });
    } else {
      // Safe way to remove hash/password from profile data so public can view
      const profileDataSafe = {
        name: profileDataSensitive.name,
        biography: profileDataSensitive.biography,
        phoneNumber: profileDataSensitive.phoneNumber,
        email: profileDataSensitive.email,
        interestGigsList: profileDataSensitive.interestGigsList,
        subscribeGigsList: profileDataSensitive.subscribeGigsList,
      };
      // Returns profile data for public to view
      res.json(profileDataSafe);
    }
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ status: "error", msg: "cannot get profile" });
  }
};

module.exports = { getProfile };