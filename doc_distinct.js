var MongoClient = require("mongodb").MongoClient;
MongoClient.connect("mongodb://localhost/",function (err,db) {
  var myDb = db.db("words");
  myDb.collection("words_stats",displayWords);
  setTimeout(function () {
    db.close();
  })
});
function displayWords(err,words) {
  //distinct():是查找不同的字段值;查询size，并结尾为o的单词
  words.distinct("size",{last:"o"},function (err,item) {
    console.log(item);
  });
  //查询first，并且字符串的最后单词为o
  words.distinct("first",{last:"o"},function (err,item) {
    console.log(item);//数组
  })
}
