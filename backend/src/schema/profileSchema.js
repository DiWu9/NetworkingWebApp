const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
  },
  status: {
    type: String
  },
  followed: {
    type: Array,
    required: [true, "Followed is required"],
  },
  picture: {
    type: String
  },
});

module.exports = profileSchema;
