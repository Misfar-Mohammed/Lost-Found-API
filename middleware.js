// Logs the HTTP method and URL for every request
function logger(req, res, next) {
  console.log(`${req.method} ${req.originalUrl}`);
  next();
}

// Protects the DELETE route with a token stored in the local .env file
function requireAuth(req, res, next) {
  const token = req.headers["x-auth-token"];
  const expectedToken = process.env.AUTH_TOKEN;

  // Fail safely if the authentication token has not been configured
  if (!expectedToken) {
    return res.status(500).json({
      success: false,
      message: "Server authentication is not configured"
    });
  }

  if (token !== expectedToken) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized: valid x-auth-token header required"
    });
  }

  next();
}

// Handles URLs that do not match any route
function notFound(req, res, next) {
  const error = new Error(`Route not found: ${req.originalUrl}`);
  error.status = 404;
  next(error);
}

// Central error handler (four parameters)
function errorHandler(err, req, res, next) {
  const statusCode = err.status || 500;

  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error"
  });
}

module.exports = { logger, requireAuth, notFound, errorHandler };
