var MongoClient = require("mongodb").MongoClient;
MongoClient.connect("mongodb://localhost/",function(err,db){
  var myDb = db.db("words");
  myDb.collection("words_stats",findItems);
  setTimeout(function(){
    db.close();
  },3000)
});
function findItems(err,words){
  words.find({first:{$in:["a","b","c"]}},function(err,cursor){
    displayWords("查询字符串开始为a 、b、c开头的: ",cursor);
  });
  words.find({size:{$gt:12}},function(err,cursor){
    displayWords("查找字符串长度大于12: ",cursor);
  });
  words.find({size:{$mod:[2,0]}},function(err,cursor){
    displayWords("查询字符长度为偶数：",cursor);
  })
  words.find({letters:{$size : 12}},function (err,cursor) {
    displayWords("查找字符串长度为12 ：",cursor);
  });
  words.find({$and:[{first:{$in:["a","e","i","o","u"]}},{last:{$in:["a","e","i","o","u"]}}]},function(err,cursor){
    displayWords("查询以a,e,i,o,u,并以a,e,i,o,u,结尾的单词 ：",cursor);
  });
  words.find({"stats.vowels":{$gt:6}},function (err,cursor) {
    displayWords("查询字符串中超过6个元音的单词",cursor);
  });
  words.find({letters:{$all:["a","e","i","o","u"]}},function(err,cursor){
    displayWords("查询包含所有的元音字母",cursor);
  });
  words.find({otherChars:{$exists:true}},function(err,cursor){
    displayWords("查询带有非字母字符的单词",cursor);
  });
  words.find({charsets:{$elemMatchL:{$and:[{type:"other"},{chars:{$size:2}}]}}},function (err,cursor) {
    displayWords("把type字段转换成other",cursor)
  })
}
function displayWords(msg,cursor,pretty){
  cursor.toArray(function(err,arrItem){
    //var arr = Array.prototype.slice.call(arrItem)
    console.log("Before " + msg);
    console.log(arrItem)//不能定义长度，求解
    var wordsList = [];
    // for(var i = 0;i < arrItem.length;i++){
    //   wordsList.push(arrItem[i].word);
    // }
    // console.log(JSON.stringify(wordsList,null,pretty));
  })
}
