#! /usr/bin/env node

console.log(
  "This script populates some test books, authors, genres and bookinstances to your database. Specified database as argument - e.g.: populatedb mongodb+srv://cooluser:coolpassword@cluster0.a9azn.mongodb.net/local_library?retryWrites=true"
);

// Get arguments passed on command line
var userArgs = process.argv.slice(2);
/*
if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}
*/
var async = require("async");
var Category = require("./models/category");
var Item = require("./models/item");

var mongoose = require("mongoose");
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

var categoryArray = [];

function categoryCreate(name, description, cb) {
  var category = new Category({
    name: name,
    description: description,
  });

  category.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log("New Category: " + category);
    categoryArray.push(category);
    cb(null, category);
  });
}

function itemCreate(name, description, category, price, number_in_stock, cb) {
  var item = new Item({
    name: name,
    description: description,
    category: category,
    price: price,
    number_in_stock: number_in_stock,
  });

  item.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }

    console.log("New Item: " + item);
    cb(null, item);
  });
}

function createItems(cb) {
  async.series(
    [
      function (callback) {
        itemCreate(
          "Ganyu Figurine",
          "Very high quality Genshin Impact figurine",
          [categoryArray[0]],
          130,
          5,
          callback
        );
      },
      function (callback) {
        itemCreate(
          "Keqing Figurine",
          "Very high quality Genshin Impact figurine",
          [categoryArray[0]],
          125,
          15,
          callback
        );
      },
      function (callback) {
        itemCreate(
          "Raiden Mei Figurine",
          "Very high quality Honkai Impact figurine",
          [categoryArray[0]],
          135,
          10,
          callback
        );
      },
      function (callback) {
        itemCreate(
          "RTX 3090",
          "GPU for your high end computer!",
          [categoryArray[1]],
          1300,
          3,
          callback
        );
      },
      function (callback) {
        itemCreate(
          "RTX 4090",
          "GPU for your high end computer!",
          [categoryArray[1]],
          200,
          4,
          callback
        );
      },
      function (callback) {
        itemCreate(
          "RX 570",
          "GPU for your high end computer!",
          [categoryArray[1]],
          570,
          3,
          callback
        );
      },
    ],
    cb
  );
}

async.series(
  [createItems],
  // Optional callback
  function (err, results) {
    if (err) {
      console.log("FINAL ERR: " + err);
    } else {
      console.log("Done!");
    }
    // All done, disconnect from database
    mongoose.connection.close();
  }
);
