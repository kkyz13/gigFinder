const mongoose = require("mongoose");

const GigsSchema = new mongoose.Schema(
  {
    //-------------Required-----------------//
    title: { type: String, require: true, minLength: 1, maxLength: 50 },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "ProviderAuth" },
    dateTimeStart: { type: Date, require: true },
    //----------------(optional)---------------//
    pic: { type: String },
    address: { type: String, maxLength: 100 },
    link: { type: String },
    description: { type: String, maxLength: 1000 },
    interestUserList: [
      { type: mongoose.Schema.Types.ObjectId, ref: "UserAuth" },
    ],
    subscribeUserList: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserAuth",
      },
    ],
  },
  { collection: "gigs" }
);

module.exports = mongoose.model("Gigs", GigsSchema);
