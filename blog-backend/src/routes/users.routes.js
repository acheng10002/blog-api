// server framework
const express = require("express");
// for handling authentication
const passport = require("passport");
// creates a sub-app for handling user routes
const router = express.Router();
// controller functions to fullfill register and user posts requests
const {
  registerController,
  getUserPostsController,
} = require("../controllers/users.controller");
// middleware that validates and sanitizes user input before the request reaches register
const userValidationRules = require("../validators/userValidation");
const { validate } = require("../validators/validate");

// POST /users/ WORKS
// this file is mounted on /users in app.js
// user submits registration details
router.post("/register", userValidationRules, validate, registerController);

// GET /users/1/posts WORKS
// protected route for getting the user's posts
router.get(
  "/:userid/posts",
  /* Passport automatically:
  - extracts the JWT from the Authorization: Bearer <token> header
  - verifies the token using my JWT_SECRET 
  - decodeds the payload
  - looks up the user via my configured JWT strategy
  - attaches the user object to req.user */
  passport.authenticate("jwt", { session: false }),
  getUserPostsController
);

module.exports = router;
