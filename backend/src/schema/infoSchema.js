const mongoose = require("mongoose");

const infoSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
  },
  dob: {
    type: Date,
    required: [true, "Date of birth is required"],
  },
  zip: {
    type: String,
    required: [true, "Zip code is required"],
  },
  displayName: {
    type: String,
  },
  phone: {
    type: String,
  }
});

module.exports = infoSchema;