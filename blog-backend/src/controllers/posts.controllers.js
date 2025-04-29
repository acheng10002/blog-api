// db access layer
const prisma = require("../db/prisma");
const { authorizeOwnership } = require("../utils/authorization");
const {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
} = require("../services/post.service");

const getAllPostsController = async (req, res) => {
  try {
    const posts = await getAllPosts();
    // return all posts as JSON
    res.json(posts);
    // error handling
  } catch (err) {
    throw new ApiError(500, "Failed to fetch posts");
  }
};

const getPostByIdController = async (req, res) => {
  // extracts the postid parameter from the route and parses it into an integer
  const postId = Number(req.params.postid);

  try {
    const post = await getPostById(postId);

    // return 404 status code if post not found
    if (!post || !post.published) {
      return res.status(404).json({ error: "Post not found" });
    }
    // if successful, return post as JSON
    res.json(post);
  } catch (err) {
    throw new ApiError(500, "Failed to fetch post");
  }
};

const createPostController = async (req, res) => {
  // extracts title, content, and published from request body
  const { title, content, published } = req.body;

  try {
    // creates a new record in the Post table of my db via Prisma
    const post = await createPost({
      title,
      content,
      published,
      authorId: req.user.id,
    });
    /* responds to client with a 201 Created status code and returns the
    newly created post as JSON */
    res.status(201).json(post);
    // error handling
  } catch (err) {
    throw new ApiError(500, "Failed to create post");
  }
};

const updatePostController = async (req, res) => {
  // extracts the postid parameter from the route and parses it into an integer
  const postId = Number(req.params.postid);
  // extracts title, content, and published from request body
  const { title, content, published } = req.body;

  try {
    // queries Post table via Prisma to find specific post
    const existingPost = await prisma.post.findUnique({
      where: { id: postId },
    });

    // checks if current user is allowed to performa this action
    authorizeOwnership(existingPost, req.user.id);

    const updatedPost = await updatePost(postId, { title, content, published });

    // returns the updated post as JSON
    res.json(updatedPost);
    // error handling
  } catch (err) {
    throw new ApiError(500, "Failed to update post");
  }
};

const deletePostController = async (req, res) => {
  // extracts the postid parameter from the route and parses it into an integer
  const postId = Number(req.params.postid);

  try {
    // queries Post table via Prisma to find specific post
    const existingPost = await prisma.post.findUnique({
      where: { id: postId },
    });

    // checks if current user is allowed to performa this action
    authorizeOwnership(existingPost, req.user.id);

    const deletedPost = await deletePost(postId);
    // return a success message as JSON
    res.json({ message: "Post deleted successfully", deletedPost });
    // error handling
  } catch (err) {
    throw new ApiError(500, "Failed to delete post");
  }
};

module.exports = {
  getAllPostsController,
  getPostByIdController,
  createPostController,
  updatePostController,
  deletePostController,
};
