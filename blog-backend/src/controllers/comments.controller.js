const { handleWithOwnership } = require("../utils/handleWithOwnership");
const {
  createComment,
  updateComment,
  deleteComment,
  getCommentByIdForAuthorization,
} = require("../services/comment.service");
const { getPostByIdForAuthorization } = require("../services/post.service");
const ApiError = require("../utils/ApiError");

const createCommentController = async (req, res, next) => {
  const postId = Number(req.params.postid);
  // extracts content from request body
  const { content } = req.body;

  try {
    const post = await getPostByIdForAuthorization(postId);

    if (!post || !post.published) {
      next(new ApiError(404, "Post not found or not published"));
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

const updateCommentController = async (req, res, next) => {
  // 1. extracts the commentid parameter from the route and parses it into an integer
  const commentId = Number(req.params.commentid);
  // extracts content from request body
  const { content } = req.body;

  try {
    const updatedComment = await handleWithOwnership({
      // queries Comment table via Prisma to find specific comment
      fetchResource: () => getCommentByIdForAuthorization(commentId),
      // 2. validates ownership
      userId: req.user.id,
      // 3. calls service function
      action: () => updateComment(commentId, content),
    });
    // 4. returns the updated comment as JSON
    res.json(updatedComment);
    // error handling
  } catch (err) {
    next(err);
  }
};

const deleteCommentController = async (req, res, next) => {
  // 1. extracts the commentid parameter from the route and parses it into an integer
  const commentId = Number(req.params.commentid);

  try {
    // queries Comment table via Prisma to find specific comment
    await handleWithOwnership({
      fetchResource: () => getCommentByIdForAuthorization(commentId),
      // 2. validates ownership
      userId: req.user.id,
      // 3. calls service function
      action: () => deleteComment(commentId),
    });
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
