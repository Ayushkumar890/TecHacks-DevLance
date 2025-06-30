const { mongoose } = require("mongoose");

const schemaPost = new mongoose.Schema({
  owner_email: String,
  owner_username: String,
  owner_linkedin: String,
  owner_img: String,
  blog: String,
});
module.exports = mongoose.model("Post", schemaPost);
