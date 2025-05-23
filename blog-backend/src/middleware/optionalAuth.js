/* allows optional JWT authentication, non-blocking JWT -based auth middleware 
enables hybrid public/private routes */
const passport = require("passport");

/* sets up jwt strategy to authenticate the incoming request without 
using sessions */
const optionalAuth = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user) => {
    // if valid user found, sets req.user to the authenticated user object
    if (user) {
      req.user = user;
    }
    // user found or not found, moves to the next step
    next();
  })(req, res, next);
};

module.exports = { optionalAuth };
