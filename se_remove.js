var mongoose = require('mongoose');//mongoose模块
var db = mongoose.connect("mongodb://localhost/words");//链接数据库
var Words = require("./se_schema");//引入model
mongoose.connection.once("open",function () {
  //Document操作对象
  var query = Words.findOne().where("word","Minis");//
  query.exec(function (err,doc) {
    console.log(doc);
    //remove删除
    doc.remove(function (err,dele) {
      //在从集合中查询word
      Words.findOne({word:"Minis"},function(err,item){
        console.log(item);
        mongoose.disconnect();
      })
    })
  })
})
