/* package.json - manifest file for Node.js project
                - defines essential info about the project and manages
                  all dependencies, scripts, and config
.env - text file to store environment variables in key-value format,
        things I don't want hardcoded in my source code */
// server framework
const express = require("express");
// for handling authentication
const passport = require("passport");
/* for authentication/validating user's identity based on credentials 
and authorization/verifying the token attached to future requests and
checking that the user is who they claim to be before allowing access 
to protected routes */
const { localStrategy, jwtStrategy } = require("./config/passport");
// CORS to allow frontend to access this backend
const cors = require("cors");
// three routers/inline middleware applied in route definitions below
const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/users.routes");
const postRoutes = require("./routes/posts.routes");
const commentRoutes = require("./routes/comments.routes");
const errorHandler = require("./middleware/errorHandler");

// initializes the Express app
const app = express();

const allowedOrigins = [
  "https://blog-access.pages.dev",
  "https://blog-edit.pages.dev",
];

// CORS middleware enables cross-origin requests (CORS) for the frontend origin
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

// global middleware parses incoming HTTP request bodies, req.body, used for API endpoints
app.use(express.urlencoded({ extended: true }));

// global middleware that parses incoming JSON request bodies, req.body, used for API endpoints
app.use(express.json());

// registers the authentication strategy inside Passport
passport.use(localStrategy);
// registers the authorization strategy inside Passport
passport.use(jwtStrategy);
app.use(passport.initialize());

app.get("/", (req, res) => {
  res.redirect("/posts");
});

/* router-level middleware - route definitions that registers routers into 
my main app 
- backend routes use both HTTP method and the path to distinguish routes,
- it's valid, standard RESTful design 
- Express routes requests to different handlers based on the HTTP method used,
  even if the URL path is the same */
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);
app.use("/posts", commentRoutes);
app.use(errorHandler);

module.exports = app;

/*
1. user logs in to web app, and server signs/issues them a JWT
2. user client browser gets the token in the response body or cookie, and
stores the JWT in memory, local storage, or a cookie
3. on every HTTP request that requires authorization, user client browser
will attach the JWT in the `Authorization` HTTP header of a request it sends
4. server looks for the JWT in the `Authorization` HTTP header and verifies
the signature
5. if the signature is valid, server decodes the JWT and usually gets the db id 
of the user in the `payload.sub`, looks the user up in the db, and stores the
user object to use
6. user receives route data and gets access to protected routes

curl - command-line tool used to send HTTP requests to a server

*/
