class ApiError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;

    /* maintains proper stack trace for Node.js 
    (for all V8 engines) */
    Error.capturesStackTrace(this, this.constructor);
  }
}

module.exports = ApiError;
