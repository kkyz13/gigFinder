const mongoose = require("mongoose");

const hostGigsListSchema = new mongoose.Schema(
  {
    gigId: { type: mongoose.ObjectId, ref: "Events" },
  },
  { collection: "hostGigsList" }
);

const ProviderAuthSchema = new mongoose.Schema(
  {
    name: { type: String, require: true },
    profilePic: { type: String },
    biography: { type: String },
    phoneNumber: { type: String, require: true },
    email: { type: String, require: true, match: /.+\@.+\..+/, unique: true },
    hash: { type: String, require: true },
    hostGigsList: [hostGigsListSchema],
  },
  { collection: "providerAuth" }
);

module.exports = mongoose.model("ProviderAuth", ProviderAuthSchema);
