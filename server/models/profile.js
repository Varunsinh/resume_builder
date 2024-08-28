const mongoose = require("mongoose");

// define the user schema
var profileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  role: {
    type: String,
    required: true,
  },
  linkedin: {
    type: String,
    required: true,
  },
  github: {
    type: String,
    required: true,
  },
  portfolio: {
    type: String,
  },
  password:{
    type: String,
    required: true,
  }
});

// create user model
var Profile = mongoose.model("profile", profileSchema);

// export user model
module.exports = Profile;
