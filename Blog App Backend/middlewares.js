const loggingMiddleware = (req, res, next) => {
  console.log("host: ", req.hostname);
  console.log("path: ", req.path);
  console.log("method: ", req.method);
  next();
};

const errorHandlingMiddleware = (err, req, res, next) => {
  console.error("An error occurred:", err);
  const statusCode = err.status || 500;
  res
    .status(statusCode)
    .json({ error: err.message || "Internal Server Error" });
};

module.exports = {
  loggingMiddleware,
  errorHandlingMiddleware,
};
