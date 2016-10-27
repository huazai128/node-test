var MongoClient = require("mongodb").MongoClient;
MongoClient.connect("mongodb://localhost/",function (err,db) {
  var myDb = db.db("words");
  myDb.collection("words_stats",findField);
  setTimeout(function () {
    db.close();
  },3000);
});
function findField(err,cursor) {
  //查找单个对象，fields：设置这个属性是否显示
  cursor.findOne({word:"idesadsdfsdfcsd"},{fields:{charsets:0}},function(err,items){
    console.log(JSON.stringify(items,null,2));
  })
  cursor.findOne({word:"idesadsdfsdfcsd"},{fields:{word:1,size:1,stats:1}},function(err,items){
    console.log(JSON.stringify(items,null,2));
  })
};
