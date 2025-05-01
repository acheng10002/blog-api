// for hashing passwords
const bcrypt = require("bcryptjs");
const { register, getUserPosts } = require("../services/user.service");
const ApiError = require("../utils/ApiError");

const registerController = async (req, res, next) => {
  // destructures username and pw from request body
  const { name, username, password } = req.body;
  // hashes the password
  const hash = await bcrypt.hash(password, 10);
  try {
    await register(name, username, hash);
    // redirects to login on success
    res.redirect("/login");
  } catch (err) {
    next(err);
  }
};

// protected controller
const getUserPostsController = async (req, res) => {
  // extracts the userid parameter from the route and parses it into an integer
  const requestedId = Number(req.params.userid);
  /* from Passport JWT 
  access the id from the authenticated user, the user who owns the token in the
  Authorization header */
  const authenticatedId = req.user.id;

  /* if userid in route does not match if of the authenticated user, reject the request
  and return a 403 Forbidden */
  if (requestedId !== authenticatedId) {
    throw new ApiError(403, "Unauthorized access to user posts");
  }

  try {
    const posts = await getUserPosts(authenticatedId);
    // sends the list of posts back to client in JSON format
    res.json(posts);
  } catch (err) {
    /* if error (e.g. db connection error), log it and return 500 with error message */
    throw new ApiError(500, "Failed to fetch posts");
  }
};

module.exports = {
  registerController,
  getUserPostsController,
};
