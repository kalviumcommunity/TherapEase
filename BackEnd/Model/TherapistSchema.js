const mongoose = require("mongoose");

const therapistSchema = new mongoose.Schema({
  name: String,
  pictureUrl: String,
  jobTitle: String,
  specialties: [String],
  languages: [String],
});

const Therapist = mongoose.model("therapistdetails", therapistSchema);

module.exports = Therapist;
