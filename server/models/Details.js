const mongoose = require("mongoose");

const DetailsSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, "Please add username"],
  },
  email: {
    type: String,
    required: [true, "Please add valid email-id"],
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address",
    ],
  },
  mobile: {
    type: Number,
    required: [true, "Please add valid mobile number"],
    minLength: 10,
    maxLength: 10,
  },
  dob: {
    type: Date,
    required: [true, "Please add date of birth"],
  },
  job: {
    type: String,
    required: [true, "Please add occupation type"],
  },
  location: {
    type: String,
    required: [true, "Please add job location"],
  },
  url: {
    type: String,
    required: true,
  },
});

const userDetails = mongoose.model("UserDetails", DetailsSchema);

module.exports = userDetails;
