var MongoClient = require("mongodb").MongoClient;
MongoClient.connect("mongodb://localhost/",function (err,db) {
  var myDb = db.db("words");
  myDb.collection("words_stats",groupItems);
  setTimeout(function () {
    db.close();
  },3000)
});
function groupItems(err,words){
  words.group(
    //查询字段，可以时对象或数组，函数
    ["first","last"],
    //query：查询字段为first为o；结尾字段可以为s、e、o、v、m
    {first:"s",last:{$in:["s","e","o","v","m"]}},
    {"count":0},//用于查询匹配的数据的数目；
    function (obj,prev) {prev.count++},true,//符合条件就＋＋
    function (err,results) {
      console.log(results);//[ { first: 's', last: 'm', count: 8 } ];结果包含要查询的字段，及符合查询条件的总数；
    }
  );
  words.group(
    ["first"],//查询集合中所有first
    {size:{$gt:12}},//并且size要大于
    {"count":0,"totalValue":0},//定义两个参数来计算查询结果的总数
    function (obj,prev) {//obj：指向当前集合words
      prev.count ++;
      prev.totalValue += obj.stats.vowels;
    },{},true,
    function (err,results) {//results:返回的结果包含产循的内容，及定义的参数
      console.log(results);
    }

  )
}
