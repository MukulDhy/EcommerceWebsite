require("colors");
const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "DEVELOPMENT" ? err.stack : null,
  });
  next();
};

module.exports = { errorHandler };
