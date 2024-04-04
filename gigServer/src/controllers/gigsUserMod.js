const GigsModel = require("../models/Gigs");
const UserAuthModel = require("../models/UserAuth");
const jwt = require("jsonwebtoken");

const getAllUsersOfGig = async (req, res) => {
  try {
    const allUsersOfGigs = await GigsModel.findById(req.params.id)
      .populate("interestUserList", "name")
      .populate("subscribeGigsList", "name")
      .exec();
    // TODO, cut it so that  only 2 arrays of user names is sent.
    res.json(allUsersOfGigs);
  } catch (error) {
    console.error(error.message);
    res
      .status(400)
      .json({ Status: "error", msg: "error getting all users of gig" });
  }
};

const putUserInGig = async (req, res) => {
  try {
    // Get Data from refresh Token
    const decoded = jwt.verify(req.body.refresh, process.env.REFRESH_SECRET);
    // Double check if profile exist and matches
    if (decoded.id != req.body.id) {
      return res.status(400).json({
        status: "error",
        msg: "error finding profile to put user into gig list",
      });
    } else {
      // Check if gig exist, protect the database.
      const theGig = await GigsModel.findOne(req.params.id);
      if (!theGig) {
        return res
          .status(400)
          .json({ status: "error", msg: "gig doesn't exist" });
      }
      // Check if user exist, protect the database.
      const theUser = await UserAuthModel.findOne(req.body.id);
      if (!theUser) {
        return res
          .status(400)
          .json({ status: "error", msg: "user doesn't exist" });
      }
      // Check which list to add.
      // Check if items is in the arrays, protect the database.
      // Push items to the two arrays.
      if (req.body.list === "interestUserList") {
        console.log(req.body.list);

        const isUserInGig = await theGig.find({
          interestUserList: req.body.id,
        });
        if (isUserInGig) {
          await GigsModel.findByIdAndUpdate(req.params.id, {
            $push: { interestUserList: req.body.id },
          });
        }

        const isGigInUser = await theUser.find({
          interestGigsList: req.params.id,
        });
        if (isGigInUser) {
          await UserAuthModel.findByIdAndUpdate(req.body.id, {
            $push: { interestGigsList: req.params.id },
          });
        }

        console.log(req.body.list + "done");
      } else {
        console.log(req.body.list);

        const isUserInGig = await theGig.find({
          subscribeUserList: req.body.id,
        });
        if (isUserInGig) {
          await GigsModel.findByIdAndUpdate(req.params.id, {
            $push: { subscribeUserList: req.body.id },
          });
        }

        const isGigInUser = await theUser.find({
          subscribeGigsList: req.params.id,
        });
        if (isGigInUser) {
          await UserAuthModel.findByIdAndUpdate(req.body.id, {
            $push: { subscribeGigsList: req.params.id },
          });
        }

        console.log(req.body.list + "done");
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
      const theGig = await GigsModel.findOne(req.params.id);
      if (!theGig) {
        return res
          .status(400)
          .json({ status: "error", msg: "gig doesn't exist" });
      }
      // Check if user exist, protect the database.
      const theUser = await UserAuthModel.findOne(req.body.id);
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

        const isUserInGig = await theGig.find({
          interestUserList: req.body.id,
        });
        if (isUserInGig) {
          await GigsModel.findByIdAndUpdate(req.params.id, {
            $pullAll: { interestUserList: req.body.id },
          });
        }

        const isGigInUser = await theUser.find({
          interestGigsList: req.params.id,
        });
        if (isGigInUser) {
          await UserAuthModel.findByIdAndUpdate(req.body.id, {
            $pullAll: { interestGigsList: req.params.id },
          });
        }

        console.log(req.body.list + "done");
      } else {
        console.log(req.body.list);

        const isUserInGig = await theGig.find({
          subscribeUserList: req.body.id,
        });
        if (isUserInGig) {
          await GigsModel.findByIdAndUpdate(req.params.id, {
            $pullAll: { subscribeUserList: req.body.id },
          });
        }

        const isGigInUser = await theUser.find({
          subscribeGigsList: req.params.id,
        });
        if (isGigInUser) {
          await UserAuthModel.findByIdAndUpdate(req.body.id, {
            $pullAll: { subscribeGigsList: req.params.id },
          });
        }

        console.log(req.body.list + "done");
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

module.exports = { getAllUsersOfGig, putUserInGig, deleteUserInGig };
