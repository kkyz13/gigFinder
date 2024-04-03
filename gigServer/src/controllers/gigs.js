const GigsModel = require("../models/Gigs");
const ProviderAuthModel = require("../models/ProviderAuth");

const getAllGigs = async (req, res) => {
  try {
    const allGigs = await GigsModel.find();
    res.json(allGigs);
  } catch (error) {
    console.error(error.message);
    res.json({ Status: "error", msg: "getting all gigs error" });
  }
};

const getGigById = async (req, res) => {
  try {
    const gig = await GigsModel.findById(req.params.id);
    res.json(gig);
  } catch (error) {
    console.error(error.message);
    res.json({ status: "error", msg: "getting gig by id error" });
  }
};

// provider add gig
const addGigForProvider = async (req, res) => {
  try {
    const inputStartDate = req.body.dateStart;
    const inputStartTime = req.body.timeStart;

    const dateTime = new Date(
      `${inputStartDate}T${inputStartTime}:00.493+00:00`
    );

    const provider = await ProviderAuthModel.findById(req.params.providerId);

    // create a new GigsModel instance with the provided data
    const newGig = new GigsModel({
      title: req.body.title,
      author: provider._id,
      dateTimeStart: dateTime,
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
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ status: "error", msg: "add gig unsuccessful" });
  }
};

const deleteGigForProvider = async (req, res) => {
  try {
    const provider = await ProviderAuthModel.findById(req.params.providerId);

    await GigsModel.findByIdAndDelete(req.params.id);

    // delete gig OID from hostGigsList array in providerAuth collection
    const indexToDelete = provider.hostGigsList.indexOf(req.params.id);
    provider.hostGigsList.splice(indexToDelete, 1);
    await provider.save();

    res.json({ status: "ok", msg: "gig deleted" });
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ status: "error", msg: "delete gig unsuccessful" });
  }
};

module.exports = {
  getAllGigs,
  getGigById,
  addGigForProvider,
  deleteGigForProvider,
};
