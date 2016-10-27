var mongoose = require("mongoose");//引入mongoose模块
var db = mongoose.connect("mongodb://localhost/words");//连接到words集合数据库
var Words = require("./se_schema");//引入Words对象
mongoose.connection.once("open",function () {//在链接等待前打开
  //findOne():查找单个对象，根据word字段为mini
  var query = Words.findOne().where("word","mini");
  //查询结果返回一个回调函数，接受查询中返回的err，doc
  query.exec(function (err,doc) {
    console.log(doc.toString());//把json对象转化成字符串
    //update():更新数据； 是Document对象中
    var query = doc.update({
      //$set:重新给word、size、last赋值
      $set:{word:"Minis",size:80,last:"p"},
      //添加lettter数组中后面添加一个s；作用于数组字段
      $push:{letters:"s"}
    });
    query.exec(function (err,doc) {
      //findOne：查询单个文档对象 这是mongodb查询语句
      Words.findOne({word:"Minis"},function (err,doc) {
        console.log(doc.toString());
        mongoose.disconnect()
      })
    })
  });
})
