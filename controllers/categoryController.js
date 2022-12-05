exports.category_detail = (req, res, next) => {
  res.send("Category: " + req.params.id);
};
