var MongoClient = require("mongodb").MongoClient;
MongoClient.connect("mongodb://localhost/",function (err,db) {
  var myDb = db.db("words");
  myDb.collection("words_stats",aggregateItem);
  setTimeout(function () {
    db.close();
  },3000)
});
function aggregateItem(err,words) {
  words.aggregate(
    [
      //$match:查询集合，查询的条件是：根据first字段查询，只要first包含a、e、s、i、o;就查询，并把结果输出给$group
      {$match:{first:{$in:["a","e","s","i","o"]}}},
      {$group://对去获取的值，进行操作
        {
          _id:"$first",//把first字段名称更改成_id;
          largest:{$max:"$size"},//增加一个最大值字段largest；$max:查找size字段中最大值，并把最大值赋给largest
          smallest:{$min:"$size"},//增加一个最小值字段smallest；$min:查找size字段中最小值，并把最小值赋给smallest
          total:{$sum:1}//查询first字段以a开头的个数
        }
      },
      {$sort:{_id:1}}//在根据更改后first的字段进行排序，升序
    ],
    function (err,results) {//查询的结果包含$group的字段；
      console.log(results);
    }
  );
  words.aggregate([
    //$match:查询集合，根据size大于12
    {$match:{size:{$gt:12}}},
    {$limit:5},//限制查询5条
    //$project:通过重命名、添加或删除字段重塑文档；
    {$project:{_id:"$word",stats:1}}
    ],//ba集合中word字段重命名为_id;stats:1表示在查询结果中显示该字段
    function (err,results) {//results：
      console.log("====");
      console.log(results);
    }
  )
  words.aggregate(
    [
      //$group:聚合管道操作，生成新的文档
      {$group:{_id:"$first",average:{$avg:"$size"}}},//把first字段重命名为_id，$avg:求平均值；把平均值命名为average
      {$sort:{average:-1}},//根据average进行排序，－1:代表降序
      {$limit:5}//限制查询5条蜀绣
    ],
    function (err,results) {
      console.log(results);
    }
  )
}
