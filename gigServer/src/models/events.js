const mongoose = require("mongoose");
// To be added
// const userListSchema = new mongoose.Schema(
//   {
//     id: { type: mongoose.ObjectId, ref: "UserAuth" },
//   },
//   { collection: "userList" }
// );

const EventsSchema = new mongoose.Schema(
  {
    //-------------Required-----------------//
    title: { type: String, require: true, minLength: 1, maxLength: 50 },
    author: { type: String, require: true, minLength: 1, maxLength: 50 },
    timeStart: { type: Date, require: true },
    //----------------(optional)---------------//
    address: { type: String, minLength: 1, maxLength: 100 },
    link: { type: String },
    description: { type: String, maxLength: 1000 },
    // interestUserList: [userListSchema],
    // subscribeUserList: [userListSchema],
  },
  { collection: "events" }
);

module.exports = mongoose.model("Events", EventsSchema);
