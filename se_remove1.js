var mongoose = require('mongoose');
var db = mongoose.connect("mongodb://localhost/words");
var Words = require("./se_schema");//
mongoose.connection.once("open",function () {
  //find();查找多个数据
  Words.find({word:/csv.*/},function (err,docs) {
    for (var i in docs) {
      console.log(docs[i].word);
    }
    //删除多个数据
    var query = Words.remove().where("word").regex(/csv.*/);
    //删除后的回调函数，接受一个错误和结果
    query.remove(function (err,results) {
      //console.log(results);
      Words.find({word:/csv.*/},function(err,docs){
        //查询结果是一个JSON格式
        if(docs.length === 0){//如果长度为0 代表已删除成功
          console.log("success");
        }else{//否则删除失败
          console.log("删除失败");
        }
        mongoose.disconnect();
      })
    })
  })
})
