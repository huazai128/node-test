var MongoClient = require("mongodb").MongoClient;
MongoClient.connect("mongodb://localhost/",function (err,db) {
  var myDB = db.db("words");
  myDB.collection("words_stats",limitFind);
  setTimeout(function(){
    db.close();
  },3000)
});
function limitFind(err,words) {
  //count()计算查找结果总数
  words.count({first:"s"},function (err,count) {
    console.log("查询字符串开头为s总数:" + count);
  });
  words.find({first:"s"},function (err,items) {
    displayItem("查询字符串开头为s",items)
  });
  words.find({first:"s",limit:2},function (err,items) {
    displayItem("限制查询5条数据",items);
  })
};
function displayItem(msg,cursor,pretty) {
  cursor.toArray(function (err,items) {
    console.log(msg+"==="+items.length);
    var arr = [];
    for(var i = 0;i < items.length;i++){
      arr.push(items[i].word);
    }
    console.log(JSON.stringify(arr,null,pretty)+"====");
  })
}
