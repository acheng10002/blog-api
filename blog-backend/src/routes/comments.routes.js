// server framework
const express = require("express");
// for handling authentication
const passport = require("passport");
// creates a sub-app for handling comment routes
const router = express.Router();
const {
  createCommentController,
  updateCommentController,
  deleteCommentController,
} = require("../controllers/comments.controller");

// POST /posts/1/comments WORKS
/* :postid is defined in the route definitions
- so no need to tell Express to merge parent route params into the child router's 
req.params 
- i.e. no needto tell Express to allow the router to inherit from the :postid param 
from its parents because that .postid param is in the route definitions */
// protected route to create a comment on a post
router.post(
  "/:postid/comments",
  passport.authenticate("jwt", { session: false }),
  createCommentController
);

// PUT /posts/1/comments/1 WORKS
// protected route to update a comment on a post
router.put(
  "/:postid/comments/:commentid",
  passport.authenticate("jwt", { session: false }),
  updateCommentController
);

// DELETE /posts/1/comments/1 WORKS
// protected route to delete a comment on a post
router.delete(
  "/:postid/comments/:commentid",
  passport.authenticate("jwt", { session: false }),
  deleteCommentController
);

module.exports = router;
