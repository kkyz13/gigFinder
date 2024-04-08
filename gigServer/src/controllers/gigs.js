const GigsModel = require("../models/Gigs");
const ProviderAuthModel = require("../models/ProviderAuth");
const UserAuthModel = require("../models/UserAuth");
const jwt = require("jsonwebtoken");

const getAllGigs = async (req, res) => {
  try {
    const allGigs = await GigsModel.find().populate("author", "name").exec();
    res.json(allGigs);
  } catch (error) {
    console.error(error.message);
    res.json({ Status: "error", msg: "getting all gigs error" });
  }
};

const getGigById = async (req, res) => {
  try {
    const gig = await GigsModel.findById(req.params.id).populate(
      "author interestUserList subscribeUserList",
      "name phoneNumber email biography"
    );
    res.json(gig);
  } catch (error) {
    console.error(error.message);
    res.json({ status: "error", msg: "getting gig by id error" });
  }
};

// provider add gig
const addGigForProvider = async (req, res) => {
  try {
    // Double check if profile exist and matches
    if (req.decoded.id != req.params.providerId) {
      return res
        .status(400)
        .json({ status: "error", msg: "error finding profile to patch" });
    } else {
      const provider = await ProviderAuthModel.findById(req.params.providerId);

      // create a new GigsModel instance with the provided data
      const newGig = new GigsModel({
        title: req.body.title,
        author: provider._id,
        dateTimeStart: req.body.dateTimeStart,
        pic: req.body.pic,
        address: req.body.address,
        link: req.body.link,
        description: req.body.description,
      });

      // save the data to the GigsModel
      await newGig.save();
      // add the newly created gig OID to the hostGigsList array in providerAuth collection
      provider.hostGigsList.push(newGig._id);
      // save the collection
      await provider.save();

      res.json({ status: "ok", msg: "gig created" });
    }
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ status: "error", msg: "add gig unsuccessful" });
  }
};

const deleteGigForProvider = async (req, res) => {
  try {
    const gig = await GigsModel.findById(req.params.id);

    // Double check if profile exist and matches
    if (req.decoded.id != gig.author) {
      return res
        .status(400)
        .json({ status: "error", msg: "error finding profile to patch" });
    } else {
      const provider = await ProviderAuthModel.findById(req.decoded.id);

      await GigsModel.findByIdAndDelete(req.params.id);

      // delete gig OID from hostGigsList array in providerAuth collection
      const indexToDelete = provider.hostGigsList.indexOf(req.params.id);
      provider.hostGigsList.splice(indexToDelete, 1);
      await provider.save();

      res.json({ status: "ok", msg: "gig deleted" });
    }
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ status: "error", msg: "delete gig unsuccessful" });
  }
};

const updateGigForProvider = async (req, res) => {
  try {
    const gig = await GigsModel.findById(req.params.id);

    // Double check if profile exist and matches
    if (req.decoded.id != gig.author) {
      return res
        .status(400)
        .json({ status: "error", msg: "error finding profile to patch" });
    } else {
      const updateGig = {};
      if ("title" in req.body) updateGig.title = req.body.title;
      if ("dateTimeStart" in req.body)
        updateGig.dateTimeStart = req.body.dateTimeStart;
      if ("pic" in req.body) updateGig.pic = req.body.pic;
      if ("address" in req.body) updateGig.address = req.body.address;
      if ("link" in req.body) updateGig.link = req.body.link;
      if ("description" in req.body)
        updateGig.description = req.body.description;

      await GigsModel.findByIdAndUpdate(req.params.id, updateGig);
      res.json({ status: "ok", msg: "gig updated" });
    }
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ status: "error", msg: "update gig unsuccessful" });
  }
};

const getAllGigsByDate = async (req, res) => {
  try {
    const allGigs = await GigsModel.find()
      .sort({ dateTimeStart: -1 })
      .populate("author", "name")
      .exec();
    res.json(allGigs);
  } catch (error) {
    console.error(error.message);
    res.json({ Status: "error", msg: "getting all gigs error" });
  }
};

module.exports = {
  getAllGigs,
  getGigById,
  addGigForProvider,
  deleteGigForProvider,
  updateGigForProvider,
  getAllGigsByDate,
};
