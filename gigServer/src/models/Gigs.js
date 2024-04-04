const mongoose = require("mongoose");
// To be added
// const userListSchema = new mongoose.Schema(
//   {
//     id: { type: mongoose.ObjectId, ref: "UserAuth" },
//   },
//   { collection: "userList" }
// );

const GigsSchema = new mongoose.Schema(
  {
    //-------------Required-----------------//
    title: { type: String, require: true, minLength: 1, maxLength: 50 },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "ProviderAuth" },
    // author: { type: String, require: true, minLength: 24, maxLength: 24 },
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
