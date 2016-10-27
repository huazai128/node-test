var MongoClient = require('mongodb').MongoClient;//mongodbClient对象
MongoClient.connect("mongodb://localhost/",function(err,db){
  var myDb = db.db("astro");//创建新的数据库
  myDb.createCollection("nebulae",function (err,nebulae) {
    //查询集合文档对象，返回数据
    nebulae.find(function(err,items){
      //toArray:遍历Cursor对象；是整个集合文件；是查询所有的数据在打印
      items.toArray(function(err,itemArr){
        console.log("==========");
        console.log(itemArr.lenght);
      })
    });
    //查询集合文档对象，返回数据
    nebulae.find(function(err,items){
      //each:查找单个对象就打印一次
      items.each(function(err,arrItem){
        //判断当前对象是否存在
        if(arrItem){
          console.log("==========kk");
          console.log(arrItem);
        }
      })
    });
    //查询单个文档对象;是根据对象属性查找
    nebulae.findOne({name:"mini"},function(err,item){
      console.log(item);
    })
  })
})
