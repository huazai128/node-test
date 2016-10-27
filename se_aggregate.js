var mongoose = require('mongoose');
var db = mongoose.connect("mongodb://localhost/words");
var Words = require("./se_schema");
setTimeout(function () {
  mongoose.disconnect();
},3000)
mongoose.connection.once("open",function () {
  //聚合查询
  Words.aggregate([
    //$match:用于查询过滤根据first查询过滤
    {$match:{first:{$in:["a","e","s","m","d"]}}},
    //group时在集合中添加字段 _id:的值是根据字段里面的first值，largest：是获取size字段里面最大值，smallest：获取size字段里面最小值；totle：
    {$group:{_id:"$first",largest:{$max:"$size"},smallest:{$min:"$size"},total:{$sum:1}}},
    {$sort:{_id:1}} //根据字段_id进行排序
  ],function (err,items) {
    console.log("sssssssss");
    console.log(items);//JSON数组
  });
});
//aggregate():聚合查询
var query = Words.aggregate();
//match:是用来过滤查询条件的
query.match({size:{$gt:12}});//查询size大于12的文档对象
query.limit(5);//限制查询5条
//append:和group都有添加字段操作
query.append({$project:{_id:"$word",stats:1}});//$project:用于添加，重命名或者修改操作 stats:1：表示盖子段显示
query.exec(function (err,items) {
  console.log("===");
  console.log(items);
})
//append:和group都有添加字段操作
var query = Words.aggregate();
//group:是添加字段把first字段值赋给_id，$avg:求平均值
query.group({_id:"$first",average:{$avg:"$size"}});
query.sort("-average");//排序
query.limit(5);//排序
query.exec(function (err,items) {
  console.log("mmmmmmmmmm");
  console.log(items);
})
