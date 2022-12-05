const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  name: String,
  description: String,
  category: [{ type: Schema.Types.ObjectId, ref: "Category" }],
  price: { type: Number },
  number_in_stock: { type: Number },
});

ItemSchema.virtual("url").get(function () {
  return `/catalog/product/${this._id}`;
});

ItemSchema.virtual("image_url").get(function () {
  let url = "/images/";
  let splitName = this.name.split(" ");

  for (item of splitName) {
    url += `${item}_`;
  }

  return url;
});

module.exports = mongoose.model("Item", ItemSchema);
