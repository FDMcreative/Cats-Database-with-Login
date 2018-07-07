function customResponses(req, res, next) {
  res.notFound = function notFound() {
    const err = new Error('notFound');
    err.status = 404;
    throw err;
  };
  next();
}

module.exports = customResponses;
