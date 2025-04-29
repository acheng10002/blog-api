function errorHandler(err, req, res, next) {
  // logs the error for debugging
  console.error(err.stack);

  // defaults to 500 if no status set
  const statusCode = err.statusCode || err.status || 500;
  const message = err.message || "Something went wrong";

  res.status(statusCode).json({
    status: statusCode,
    message,
  });
}

module.exports = errorHandler;
