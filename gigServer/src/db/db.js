const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.LOCALDB);
    console.log("DB Connected");
  } catch (error) {
    console.error(error.message);
    process.exit(1); // 0 is no error, 1 is with error
  }
};

module.exports = connectDB;
