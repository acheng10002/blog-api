// server framework
const express = require("express");
// for handling authentication
const passport = require("passport");
// creates a sub-app for handling authentication routes
const router = express.Router();
// controller functions to fullfill login and logout requests
const { login, logout } = require("../controllers/auth.controller");

/* POST /auth/login WORKS
this file is mounted on /auth in app.js
authenticates and logins user */
router.post(
  "/login",
  /* Passport invokes local strategy, disables session storage, using stateless JWT 
  - Passport validates the username and password 
  - if valid, Passport attaches the authenticated user object to req.user
  - proceeds to my login controller if successful */
  passport.authenticate("local", { session: false }),
  login
);

/* POST /auth/logout WORKS
stateless logout, with no session to destroy */
router.post("/logout", logout);

/* allows frontend to fetch the currently logged in user's details based on the JWT 
token sent in the request 
- when the app reloads, this route is used to confirm the token is still valid 
- app gets current user info to populate UI state 
- this is the initial load of an authenticated SPA */
router.get(
  "/me",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json(req.user);
  }
);

module.exports = router;

/* used curl in a terminal to test routes (previously used Postman to send PUT and
POST requests without needing to set up and fill HTML forms) 
fetch requests for PROTECTED ROUTES
- /auth/login - request made by <UserForm key="login" mode="login" />
  router.post("/login", passport.authenticate("local", { session: false }), login);

- /auth/me
  router.get("/me", passport.authenticate("local", { session: false }), (req, res) => {
    res.json(req.user););

- <Route path="/users/:userid/posts" element={<UserPosts />} />
- /users/:userid/posts - request made by <UserPosts />
  router.get("/:userid/posts", passport.authenticate("jwt", { session: false }), getUserPostsController);

- <Route path="/users/:userid/posts/create" element={<CreatePost />} />
- /posts/ - request made by <CreatePost />
  router.post("/", passport.authenticate("jwt", { session: false }), createPostController);
 
- <Route path="/users/:userid/posts/edit/:postid" element={<EditPost />} />
- /posts/1 - request made by <EditPost />
  router.put("/:postid", passport.authenticate("jwt", { session: false }), updatePostController);

- /posts/1 - request made by <PostPage />
  router.delete("/:postid", passport.authenticate("jwt", { session: false }), deletePostController);

- /posts/:postid/comments
  router.post("/:postid/comments", passport.authenticate("jwt", { session: false }), createCommentController);

- /posts/:postid/comments/:commentid
  router.put("/:postid/comments/:commentid", passport.authenticate("jwt", { session: false }), updateCommentController);

  - /posts/:postid/comments/:commentid
  router.delete("/:postid/comments/:commentid", passport.authenticate("jwt", { session: false }), deleteCommentController);


fetch requests for PUBLIC ROUTES
- <Route path="/auth/login" element={<UserForm key="login" mode="login" />} /> 

- <Route path="/users/register" element={<UserForm key="register" mode="register" />} />
- /users/register - request made by <UserForm key="register" mode="register" />
  router.post("/register", userValidationRules, validate, registerController);

- <Route path="/" element={<Home />} />
- /posts - request made by <Home />
  router.get("/", getAllPostsController);

- <Route path="/posts/:postid" element={<PostPage />} />
- /posts/:postid - request made by <PostPage />
  router.get("/:postid", getPostByIdController);

- <Route path="/auth/logout" element={<Home />} />
- /auth/logout 
  router.post("/logout", logout);
*/
