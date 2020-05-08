const express = require("express");

const PostController = require("../controllers/posts-controller");

// Validation of authentication
const checkAuth = require("../middleware/check-auth");
// File extraction and upload
const extractFile = require("../middleware/file-upload");

const router = express.Router();

// CREATE POST
router.post("", checkAuth, extractFile, PostController.createPost);

// UPDATE POST
router.put("/:id", checkAuth, extractFile, PostController.updatePost);

// GET ALL POSTS
router.get("", PostController.getAllPosts);

// GET ONE POST
router.get("/:id", PostController.getOnePost);

// DELETE POST
router.delete("/:id", checkAuth, PostController.deletePost);

module.exports = router;