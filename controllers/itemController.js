const Item = require("../models/Item");

exports.item_list = (req, res, next) => {
  res.render("index", { title: "Catalog" });
};

exports.item_detail = (req, res, next) => {
  res.send("NOT IMPLEMENTED: " + req.params.id);
};

exports.item_update_get = (req, res, next) => {
  res.send("NOT IMPLEMENTED YET: " + req.params.id);
};

exports.item_update_post = (req, res, next) => {
  res.send("NOT IMPLEMENTED YET: " + req.params.id);
};

exports.item_add_get = (req, res, next) => {
  res.send("NOT IMPLEMENTED YET" + req.params.id);
};

exports.item_add_post = (req, res, next) => {
  res.send("NOT IMPLEMENTED YET" + req.params.id);
};

exports.item_remove_get = (req, res, next) => {
  res.send("NOT IMPLEMENTED YET" + req.params.id);
};

exports.item_remove_post = (req, res, next) => {
  res.send("NOT IMPLEMENTED YET" + req.params.id);
};
