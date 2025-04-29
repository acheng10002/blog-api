/* Passport Local Strategy verifies credentials
Passport populates req.user
this controller with jsonwebtoken creates the JWT
Passport JWT Strategy verifies JWT on future requests
for creating and verifying JWTs */
const jwt = require("jsonwebtoken");
// environment variables
require("dotenv").config();

// loads JWT secret from .env, the secret will sign and verify tokens
const SECRET = process.env.JWT_SECRET;

const login =
  /* if authentication fails, Passport handles response automatically 
callback only runs if authentication succeeds - req.user is the authenticated user */
  (req, res) => {
    /* if authenticaion succeeds, server issues a JWT using jsonwebtoken
  payload - { id: req.user.id } get encoded into the token
  secret - signature
  option - the token will expire in 1 h */
    const token = jwt.sign({ id: req.user.id }, SECRET, { expiresIn: "1h" });
    /* server signs and sends the signed token back to the client in the response body 
    this signed token will be attached to future requests, allowing the client
    access to protected routes */
    res.json({ token, redirectTo: `/users/${req.user.id}/posts` });
  };

const logout = (req, res) => {
  res.json({ message: "Logged out successfully: client should discard token" });
};

module.exports = {
  login,
  logout,
};
