const { handleWithOwnership } = require("../utils/handleWithOwnership");
const {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
  getPostByIdForAuthorization,
} = require("../services/post.service");
const ApiError = require("../utils/ApiError");

const getAllPostsController = async (req, res) => {
  try {
    const posts = await getAllPosts();
    // return all posts as JSON
    res.json(posts);
    // error handling
  } catch (err) {
    console.log("Failed to fetch posts:", err);
    if (err instanceof ApiError) throw err;
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
    console.log("Failed to fetch post:", err);
    if (err instanceof ApiError) throw err;
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
    console.log("Failed to create post:", err);
    if (err instanceof ApiError) throw err;
    throw new ApiError(500, "Failed to create post");
  }
};

const updatePostController = async (req, res) => {
  // 1. extracts the postid parameter from the route and parses it into an integer
  const postId = Number(req.params.postid);
  // extracts title, content, and published from request body
  const { title, content, published } = req.body;

  try {
    const updatedPost = await handleWithOwnership({
      // queries Post table via Prisma to find specific post
      fetchResource: () => getPostByIdForAuthorization(postId),
      // 2. validates ownership - checks if current user is allowed to perform this action
      userId: req.user.id,
      // 3. calls service function
      action: () => updatePost(postId, { title, content, published }),
    });
    // 4. returns the updated post as JSON
    res.json(updatedPost);

    // error handling
  } catch (err) {
    console.log("Failed to update post:", err);
    if (err instanceof ApiError) throw err;
    throw new ApiError(500, "Failed to update post");
  }
};

const deletePostController = async (req, res) => {
  // 1. extracts the postid parameter from the route and parses it into an integer
  const postId = Number(req.params.postid);

  try {
    await handleWithOwnership({
      // queries Post table via Prisma to find specific post
      fetchResource: () => getPostByIdForAuthorization(postId),
      // 2. validates ownership - checks if current user is allowed to perform this action
      userId: req.user.id,
      // 3. call service function
      action: () => deletePost(postId),
    });
    // 4. returns response - a success message as JSON
    res.status(204).json({ message: "Post deleted successfully" });
    // error handling
  } catch (err) {
    console.log("Failed to delete post:", err);
    if (err instanceof ApiError) throw err;
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
