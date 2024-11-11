function validateId(req, res, next) {
  const id = parseInt(req.params.id);
  if (isNaN(id) || id <= 0) {
    return res.status(400).send("Invalid ID format");
  }
  next();
}

module.exports = validateId;
