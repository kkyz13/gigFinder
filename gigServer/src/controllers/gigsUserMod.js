const GigsModel = require("../models/Gigs");
const UserAuthModel = require("../models/UserAuth");
const jwt = require("jsonwebtoken");

const getAllUsersOfGig = async (req, res) => {
  try {
    const allUsersOfGigs = await GigsModel.findById(req.params.id)
      .populate("interestUserList subscribeUserList", "name")
      .exec();
    res.json({
      interestUserList: allUsersOfGigs.interestUserList,
      subscribeUserList: allUsersOfGigs.subscribeUserList,
    });
  } catch (error) {
    console.error(error.message);
    res
      .status(400)
      .json({ Status: "error", msg: "error getting all users of gig" });
  }
};

const putUserInGig = async (req, res) => {
  try {
    // Get Data from access Token
    const decoded = jwt.verify(req.body.access, process.env.ACCESS_SECRET);
    // Double check if profile exist and matches
    if (decoded.id != req.body.id) {
      return res.status(400).json({
        status: "error",
        msg: "error finding profile to put user into gig list",
      });
    } else {
      // Check if gig exist, protect the database.
      const theGig = await GigsModel.findOne({ _id: req.params.id });
      if (!theGig) {
        return res
          .status(400)
          .json({ status: "error", msg: "gig doesn't exist" });
      }
      // Check if user exist, protect the database.
      const theUser = await UserAuthModel.findOne({ _id: req.body.id });
      if (!theUser) {
        return res
          .status(400)
          .json({ status: "error", msg: "user doesn't exist" });
      }
      // Check which list to add.
      // Check if items is in the arrays, protect the database.
      // Push items to the two arrays.
      if (req.body.list === "interestUserList") {
        const isUserInGig = await theGig.interestUserList.includes(req.body.id);
        if (!isUserInGig) {
          await GigsModel.findByIdAndUpdate(req.params.id, {
            $push: { interestUserList: req.body.id },
          });
        }

        const isGigInUser = await theUser.interestGigsList.includes(
          req.params.id
        );
        if (!isGigInUser) {
          await UserAuthModel.findByIdAndUpdate(req.body.id, {
            $push: { interestGigsList: req.params.id },
          });
        }
      } else {
        const isUserInGig = await theGig.subscribeUserList.includes(
          req.body.id
        );
        if (!isUserInGig) {
          await GigsModel.findByIdAndUpdate(req.params.id, {
            $push: { subscribeUserList: req.body.id },
          });
        }

        const isGigInUser = await theUser.subscribeGigsList.includes(
          req.params.id
        );
        if (isGigInUser) {
          await UserAuthModel.findByIdAndUpdate(req.body.id, {
            $push: { subscribeGigsList: req.params.id },
          });
        }
      }
      return res.json(
        decoded.email + " added to " + req.params.id + " " + req.body.list
      );
    }
  } catch (error) {
    console.error(error.message);
    res
      .status(400)
      .json({ Status: "error", msg: "error putting user into gig" });
  }
};

const deleteUserInGig = async (req, res) => {
  try {
    // Get Data from refresh Token
    const decoded = jwt.verify(req.body.refresh, process.env.REFRESH_SECRET);
    // Double check if profile exist and matches
    if (decoded.id != req.body.id) {
      return res.status(400).json({
        status: "error",
        msg: "error finding profile to delete user from gig list",
      });
    } else {
      // Check if gig exist, protect the database.
      const theGig = await GigsModel.findOne({ _id: req.params.id });
      if (!theGig) {
        return res
          .status(400)
          .json({ status: "error", msg: "gig doesn't exist" });
      }
      // Check if user exist, protect the database.
      const theUser = await UserAuthModel.findOne({ _id: req.body.id });
      if (!theUser) {
        return res
          .status(400)
          .json({ status: "error", msg: "user doesn't exist" });
      }
      // Check which list to remove.
      // Check if items is in the arrays, protect the database.
      // Remove items from the two arrays.
      if (req.body.list === "interestUserList") {
        console.log(req.body.list);

        const isUserInGig = await theGig.interestUserList.includes(req.body.id);
        if (isUserInGig) {
          await GigsModel.findByIdAndUpdate(req.params.id, {
            $pull: { interestUserList: req.body.id },
          });
        }

        const isGigInUser = await theUser.interestGigsList.includes(
          req.params.id
        );
        if (isGigInUser) {
          await UserAuthModel.findByIdAndUpdate(req.body.id, {
            $pull: { interestGigsList: req.params.id },
          });
        }

        console.log(req.body.list + "done delete");
      } else {
        console.log(req.body.list);

        const isUserInGig = await theGig.subscribeUserList.includes(
          req.body.id
        );
        if (isUserInGig) {
          await GigsModel.findByIdAndUpdate(req.params.id, {
            $pull: { subscribeUserList: req.body.id },
          });
        }

        const isGigInUser = await theUser.subscribeGigsList.includes(
          req.params.id
        );
        if (isGigInUser) {
          await UserAuthModel.findByIdAndUpdate(req.body.id, {
            $pull: { subscribeGigsList: req.params.id },
          });
        }

        console.log(req.body.list + "done delete");
      }
      return res.json(
        decoded.email + " remove " + req.params.id + " " + req.body.list
      );
    }
  } catch (error) {
    console.error(error.message);
    res
      .status(400)
      .json({ Status: "error", msg: "error deleting user into gig" });
  }
};

module.exports = { getAllUsersOfGig, putUserInGig, deleteUserInGig };
