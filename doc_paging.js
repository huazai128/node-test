var util = require("util");//引用工具服务
var MongoClient = require("mongodb").MongoClient;//创建一个MongoClient对象
//链接
MongoClient.connect("mongodb://localhost/",function(err,db){
  //新建数据库名
  var myDb = db.db("words");
  //访问数据库中的集合，返回访问的集合对象
  myDb.collection("words_stats",function (err,collection) {
    //进行分页
    pageResults(err,collection,0,4);
  })
});
function pageResults(err,words,startIndex,pageSize) {
  //在集合中查询多个文档对象，首字母为s开头，limit：限制查询多少条数据，skip:从什么开始查询，根据word进行排序
  words.find(
    {first:"s"},
    {limit: pageSize,skip:startIndex,sort:[["word",1]]},
    function (err,cursor) {//返回一个回调函数，接受连个参数err，cursor：参数出来的数据
      cursor.count(true,function(err,countCursor){//查询数据的总数;是查找数据的总数；每次查找4 条数据，如果没有为0
        displayWords("Page Start at " + startIndex,cursor);
        console.log(countCursor+"==== ");//4  没有返回为0
        if(countCursor === pageSize){//
          pageResults(err,words,startIndex + pageSize,pageSize);
        }else{
          db.close();
        }
      })
    }
  )
}
function displayWords(msg,cursor,pretty) {
  cursor.toArray(function (err,arrItem) {
    console.log(msg);
    console.log(arrItem);
    //console.log(JSON.stringify(arrItem,null,pretty));
  })
}
