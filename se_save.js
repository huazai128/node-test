var mongoose = require("mongoose");
var db = mongoose.connect("mongodb://localhost/words");
var Words = require("./se_schema");
//等待数据库链接
mongoose.connection.once("open",function () {
  //findOne()操作单个文档对象
  var query = Words.findOne().where("word","keke");//findOne():查找单个文档对象;where():添加要查询word字段，并且word字段的内容为keke
  query.exec(function (err,doc) {
    if(doc === null){//判断查询是否为空
      return
    }else{
      console.log(doc.isNew);//为false说明数据已经保存到数据库中了
      console.log(doc.toJSON());//把查询的Document对象变成JSON字符串；
      doc.set("word","Book");//set()：重新设定word字段值  set():只适用于单个文档对象的查询；使用find()会报错
      doc.set("first","B");//重新设定first的值
      //modifiedPaths()；返回修改过的字段
      console.log(doc.modifiedPaths());//返回被修改字段值的数组
      //保存数据
      doc.save(function (err) {
        //重新查找
        Words.findOne({word:"Book"},function (err,item) {
          console.log(item.toJSON());
          mongoose.disconnect();
        })
      })
    }
  })
})
