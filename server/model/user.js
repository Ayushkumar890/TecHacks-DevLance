const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  linkedin: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
    default: "",
  },
  accountType: {
    type: String,
    required: true,
  },
  verification_token: String,
  github_verified: {
    type: Boolean,
    default: false,
  },
  github_name: {
    type: String,
    default: ""
  },
  verified: {
    type: Boolean,
    default: false,
  },
//   git_profile: {}, // optionally add validation if needed
});

module.exports = mongoose.model('User', userSchema);
