var mongoose = require('mongoose');
var db = mongoose.connect("mongodb://localhost/words");
var Words = require("./se_schema");
mongoose.connection.once("open",function () {
  //查询Words集合中所有包含sdv的字符串
  var query = Words.find({word:/sdv.*/},function(err,docs){
    for(var i in docs){
      console.log(docs[i].word+" , "+ docs[i].size);
    }
  });
  //update():更新数据，并设置size： 0；
  var query = Words.update({},{$set:{size:0}});
  query.setOptions({multi:true});//设置执行数据库请求时，用于Mongodb交付的选项
  query.where("word").regex(/sdv.*/);//查询word字段，所有匹配sdv的字符串
  query.exec(function (err,items) {//回调函数保存成功后的回调函数
    Words.find({word:/sdv.*/},function (err,docs) {//在重新查询数据库
      console.log("update");
      for(var i in docs){
        console.log(docs[i].word+"===="+docs[i].size);
      };
      mongoose.disconnect();
    });
  })
})
