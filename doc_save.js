/*
  更新文档中的集合
*/

var MongoClient = require('mongodb').MongoClient;//mongodbClient对象
MongoClient.connect("mongodb://localhost/",function(err,db){
  var myDb = db.db("astro");//创建新的数据库
  myDb.createCollection("nebulae",function (err,nebulae) {
    //查找单个文档对象
    nebulae.findOne({name:"mini"},function(err,item){
      console.log("Before save");
      console.log(item);
      item.info = "Save name keke";
      //save(doc,[options],callback);保存数据
      nebulae.save(item,{w:1},function(err,results){
        //根据ID查找单个文档对象
        nebulae.findOne({_id:item._id},function(arr,saveItem){
          console.log("After save");
          console.log(saveItem);
          db.close();
        })
      })
    });
  })
})
