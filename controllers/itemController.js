const Item = require("../models/Item");

exports.item_list = (req, res, next) => {
  res.render("index", { title: "Catalog" });
};

exports.item_detail = (req, res, next) => {
  res.send("NOT IMPLEMENTED: " + req.params.id);
};
