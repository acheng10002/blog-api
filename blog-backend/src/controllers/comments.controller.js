// db access layer
const prisma = require("../db/prisma");
const {
  createComment,
  updateComment,
  deleteComment,
} = require("../services/comment.service");

const createCommentController = async (req, res) => {
  const postId = Number(req.params.postid);
  // extracts content from request body
  const { content } = req.body;

  try {
    const post = await prisma.post.findUnique({
      where: { id: postId },
    });

    if (!post || !post.published) {
      const error = new Error("Post not found or not published");
      error.status = 404;
      return next(error);
    }
    const comment = await createComment(content, postId, req.user.id);
    /* responds to client with a 201 Created status code and returns the
      newly created comment as JSON */
    res.status(201).json(comment);
    // error handling
  } catch (err) {
    next(err);
  }
};

const updateCommentController = async (req, res) => {
  // extracts the commentid parameter from the route and parses it into an integer
  const commentId = Number(req.params.commentid);
  // extracts content from request body
  const { content } = req.body;

  try {
    // queries Comment table via Prisma to find specific comment
    const existingComment = await prisma.comment.findUnique({
      where: { id: commentId },
    });

    authorizeOwnership(existingComment, req.user.id);

    const updatedComment = await updateComment(commentId, content);

    // returns the updated comment as JSON
    res.json(updatedComment);
    // error handling
  } catch (err) {
    next(err);
  }
};

const deleteCommentController = async (req, res) => {
  // extracts the commentid parameter from the route and parses it into an integer
  const commentId = Number(req.params.commentid);

  try {
    // queries Comment table via Prisma to find specific comment
    const existingComment = await prisma.comment.findUnique({
      where: { id: commentId },
    });

    authorizeOwnership(existingComment, req.user.id);

    const deletedComment = await deleteComment(commentId);

    // return a success message as JSON
    res.json({ message: "Comment deleted successfully", deletedComment });
    // error handling
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createCommentController,
  updateCommentController,
  deleteCommentController,
};
