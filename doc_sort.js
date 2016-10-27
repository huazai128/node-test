var MongoClient = require("Mongodb").MongoClient;
MongoClient.connect("mongodb://localhost/",function (err,db) {
  var myDb = db.db("words");
  myDb.collection("words_stats",sortItem);
  setTimeout(function () {
    db.close();
  },3000)
});
function displayWords(msg,cursor,pretty) {
  cursor.toArray(function (err,arrItem) {
    console.log("\n"+msg);
    var arr = [];
    for(var i = 0;i < arrItem.length;i++){
      arr.push(arrItem[i].word);
    }
    console.log(JSON.stringify(arr,null,pretty));
  })
}
function sortItem(err,words) {
  words.find({first:"v"},{sort:{word:1}},function (err,cursor) {
    displayWords("查询开头字母为v，并且根据word进行升序",cursor);
  })
  words.find({first:"s"},{sort:[["saze",1],["last",-1]]},function (err,cursor) {
    displayWords("查询开头字母为v，并且根据size进行升序last为降序",cursor);
  })
}
