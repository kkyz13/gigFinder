const GigsModel = require("../models/Gigs");
const ProviderAuthModel = require("../models/ProviderAuth");

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

module.exports = { addGigForProvider };
