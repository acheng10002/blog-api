function errorHandler(err, req, res, next) {
  // logs the error for debugging
  console.error(err.stack);

  // defaults to 500 if no status set
  const statusCode = err.statusCode || err.status || 500;
  // default message
  const message = err.message || "Something went wrong";

  /* sets HTTP response status code and sends JSON-formatted response body
  to the client */
  res.status(statusCode).json({
    // statua key in the JSON body mirrors the HTTP status code
    status: statusCode,
    // human-readable error message
    message,
  });
}

module.exports = errorHandler;
