var MongoClient = require("mongodb").MongoClient;
var GridStore = require("mongodb").GridStore;
MongoClient.connect("mongodb://localhost/",function (err,db) {
  var gridStore = new GridStore(db,"word_file","w");
  console.log("keke");
})
