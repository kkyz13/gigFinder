const mongoose = require("mongoose");

const UserAuthSchema = new mongoose.Schema(
  {
    name: { type: String, require: true },
    profilePic: { type: String },
    biography: { type: String },
    phoneNumber: { type: String, require: true },
    email: { type: String, require: true, match: /.+\@.+\..+/, unique: true },
    hash: { type: String, require: true },
    interestGigsList: [{ type: mongoose.ObjectId, ref: "Gigs" }],
    subscribeGigsList: [{ type: mongoose.ObjectId, ref: "Gigs" }],
  },
  { collection: "userAuth" }
);

module.exports = mongoose.model("UserAuth", UserAuthSchema);
