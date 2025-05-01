// server framework
const express = require("express");
// for handling authentication
const passport = require("passport");
// creates a sub-app for handling authentication routes
const router = express.Router();
// controller functions to fullfill login and logout requests
const { login, logout } = require("../controllers/auth.controller");

// POST /auth/login WORKS
// this file is mounted on /auth in app.js
// authenticates and logins user
router.post(
  "/login",
  /* Passport invokes local strategy, disables session storage, using stateless JWT 
  - Passport validates the username and password 
  - if valid, Passport attaches the authenticated user object to req.user
  - proceeds to my login controller if successful */
  passport.authenticate("local", { session: false }),
  login
);

// POST /auth/logout WORKS
// stateless logout, with no session to destroy
router.post("/logout", logout);

module.exports = router;
