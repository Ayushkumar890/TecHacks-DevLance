const Post = require("../model/post");
const User = require("../model/user");

exports.createPost = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const { blog, profileUrl } = req.body;

    const newPost = await Post.create({
      owner_email: user.email,
      owner_username: user.github_name,
      owner_linkedin: user.linkedin,
      owner_img: profileUrl,
      blog,
    });

    return res.status(201).json({
      success: true,
      message: "Post created successfully",
      post: newPost,
    });
  } catch (error) {
    console.error("Post creation error:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    return res.status(200).json({ success: true, posts });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Failed to fetch posts" });
  }
};

exports.getUserPosts = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const posts = await Post.find({ owner_email: user.email });
    return res.status(200).json({ success: true, posts: posts });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Error getting user posts" });
  }
};


// DELETE POST
exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    const user = await User.findById(req.user._id);

    if (!post) return res.status(404).json({ success: false, message: "Post not found" });

    if (post.owner_email.toLowerCase() !== user.email.toLowerCase())
      return res.status(403).json({ success: false, message: "Unauthorized" });


    await post.deleteOne();
    return res.status(200).json({ success: true, message: "Post deleted successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Error deleting post" });
  }
};

// EDIT POST
exports.editPost = async (req, res) => {
  const { blog } = req.body;
  try {
    const post = await Post.findById(req.params.id);
    const user = await User.findById(req.user._id);

    if (!post) return res.status(404).json({ success: false, message: "Post not found" });

    if (post.owner_email !== user.email)
      return res.status(403).json({ success: false, message: "Unauthorized" });

    post.blog = blog;
    await post.save();
    return res.status(200).json({ success: true, post });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Error editing post" });
  }
};

