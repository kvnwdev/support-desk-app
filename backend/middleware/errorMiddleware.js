const errorHandler = (error, req, res, next) => {
  if (!res.statusCode) res.status(500);
  res.json({
    message: error.message,
    stack: process.env.NODE_ENV === 'production' ? null : error.stack,
  });
};

module.exports = { errorHandler };
