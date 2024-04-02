const mongoose = require("mongoose");

const EventsSchema = new mongoose.Schema(
  {
    //-------------Required-----------------//
    title: { type: String, require: true, minLength: 1, maxLength: 50 },
    author: { type: String, require: true, minLength: 1, maxLength: 50 },
    address: { type: String, require: true, minLength: 1, maxLength: 50 },
    timeStart: { type: Date, require: true },
    link: { type: String, require: true },
    //----------------(optional)---------------//
    description: { type: String },
    // interestUserList: [userSchema],
    // subscribeUserList: [userSchema],
  },
  { collection: "event" }
);

module.exports = mongoose.model("Events", EventsSchema);
