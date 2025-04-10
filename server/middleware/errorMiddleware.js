const notFound = (req, res, next) => {
    res.status(404);
    res.json({ message: `Not Found - ${req.originalUrl}` });
  };
  
  const errorHandler = (err, req, res, next) => {
    res.status(500);
    res.json({ message: err.message });
  };
  
  module.exports = { notFound, errorHandler };