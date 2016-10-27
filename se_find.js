var mongoose = require("mongoose");
var db = mongoose.connect("mongodb://localhost/words");//链接指定的数据库
var Words = require("./se_schema");//引入model
setTimeout(function () {
  mongoose.disconnect();//关闭数据库链接
},3000)
mongoose.connection.once("open",function () {//数据库链接等待打开
  //count();是总数查询，查询first首字母a、e、i、o、u
  var query = Words.count().where("first").in(["a","e","i","o","u"]);
  //查询last为a、e、i、o、u
  query.where("last").in(["a","e","i","o","u"]);
  //查询的后回调函数
  query.exec(function (err,count) {
    console.log(count);
  });
  //find():查询多个文档，limit():限制查询数据条数，sort：排序，根据size进行降序
  query.find().limit(5).sort({size:-1});
  //查询完成后的回调函数
  query.exec(function (err,items) {
    //遍历数据
    for(var i in items){
      console.log(items[i].word);
    }
  })
  //查询集合文档
  query = Words.find();
  //mod():满足size的数值除以2余数为0；查询
  query.mod("size",2,0);
  //where:查询size大于6 的数据
  query.where("size").gt(6);
  //限制查询显示10条数据
  query.limit(10);
  //select():强制显示字段
  query.select({word:1,size:0});
  //回调函数
  query.exec(function (err,items) {
    console.log("items ======");
    //
    for(var i in items){
      console.log(JSON.stringify(items[i]));
    }
  })
})
