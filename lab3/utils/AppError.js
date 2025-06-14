class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;

    // copy stack trace from the original error
    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;
