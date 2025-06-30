const express = require("express");
const router = express.Router();
const { createPost, getAllPosts, getUserPosts, deletePost, editPost } = require("../controller/postController");
const { isAuthenticated } = require("../middleware/verifytoken");

router.post("/create", isAuthenticated, createPost);
router.get("/all", getAllPosts);
router.get("/userpost", isAuthenticated, getUserPosts);
router.delete("/delete/:id", isAuthenticated, deletePost);
router.put("/edit/:id", isAuthenticated, editPost);


module.exports = router;

