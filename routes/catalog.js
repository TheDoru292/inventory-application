const express = require("express");
const router = express.Router();

const item = require("../controllers/itemController");
const category = require("../controllers/categoryController");

router.get("/", item.item_list);

router.get("/item/:id", item.item_detail);

router.get("/category/:id", category.category_detail);

module.exports = router;
