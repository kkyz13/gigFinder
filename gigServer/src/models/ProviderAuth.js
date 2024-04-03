const mongoose = require("mongoose");

const ProviderAuthSchema = new mongoose.Schema(
  {
    name: { type: String, require: true },
    profilePic: { type: String },
    biography: { type: String },
    phoneNumber: { type: String, require: true },
    email: { type: String, require: true, match: /.+\@.+\..+/, unique: true },
    hash: { type: String, require: true },
    hostGigsList: [{ type: mongoose.ObjectId, ref: "Gigs" }],
  },
  { collection: "providerAuth" }
);

module.exports = mongoose.model("ProviderAuth", ProviderAuthSchema);
