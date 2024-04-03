const mongoose = require("mongoose");

const interestGigsListSchema = new mongoose.Schema(
  {
    gigId: { type: mongoose.ObjectId, ref: "Events" },
  },
  { collection: "interestGigsList" }
);

const subscribeGigsListSchema = new mongoose.Schema(
  {
    gigId: { type: mongoose.ObjectId, ref: "Events" },
  },
  { collection: "subscribeGigsList" }
);

const UserAuthSchema = new mongoose.Schema(
  {
    name: { type: String, require: true },
    profilePic: { type: String },
    biography: { type: String },
    phoneNumber: { type: String, require: true },
    email: { type: String, require: true, match: /.+\@.+\..+/, unique: true },
    hash: { type: String, require: true },
    interestGigsList: [interestGigsListSchema],
    subscribeGigsList: [subscribeGigsListSchema],
  },
  { collection: "userAuth" }
);

module.exports = mongoose.model("UserAuth", UserAuthSchema);
