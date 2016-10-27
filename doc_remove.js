var MongoClient = require('mongodb').MongoClient;//mongodbClient对象
MongoClient.connect("mongodb://localhost/",function(err,db){
  var myDB = db.db("astro");
  myDB.collection("nebulae",function(err,nebulae){
    nebulae.find(function (err,items) {
      //遍历集合，返回单个文档对象
      items.toArray(function(err,arrItem){
        console.log(arrItem);
        //删除返回的是
        nebulae.remove({name:"mini"},function(err,results){
          console.log("Delete"+results);//{"ok":1 ,"n":3};ok:1代表删除成功  n：代表删除条数；
          nebulae.find(function(err,items){
            items.toArray(function(err,arrItem){
              console.log("Delete After");
              console.log(arrItem);
              db.close();
            })
          })
        })
      })
    })
  })
})
