// server framework
const express = require("express");
// for handling authentication
const passport = require("passport");
// creates a sub-app for handling user routes
const router = express.Router();
/* controller functions to fullfill public all posts, requests */
const {
  getAllPostsController,
  getPostByIdController,
  createPostController,
  updatePostController,
  deletePostController,
} = require("../controllers/posts.controller");

// GET /posts/ WORKS
// public route for getting all posts without comments
router.get("/", getAllPostsController);

// GET /posts/1 WORKS
// public route for getting specific post with its comments
router.get("/:postid", getPostByIdController);

// POST /posts/ WORKS
// protected route for creating a post as a logged in user
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  createPostController
);

// PUT /posts/1 WORKS
// protected route for updating a post as a logged in user
router.put(
  "/:postid",
  passport.authenticate("jwt", { session: false }),
  updatePostController
);

// DELETE /posts/1 WORKS
// protected route for deleting a post as a logged in user
router.delete(
  "/:postid",
  passport.authenticate("jwt", { session: false }),
  deletePostController
);

module.exports = router;
