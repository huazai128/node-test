/*
  更新文档中的集合
*/

var MongoClient = require('mongodb').MongoClient;//mongodbClient对象
MongoClient.connect("mongodb://localhost/",function(err,db){
  var myDb = db.db("astro");//创建新的数据库
  myDb.createCollection("nebulae",function (err,nebulae) {
    //查询集合文档对象，返回数据
    nebulae.find(function(err,items){
      //toArray:遍历Cursor对象；是整个集合文件；是查询所有的数据在打印
      items.toArray(function(err,itemArr){
        console.log("==========");
        console.log(itemArr);
        nebulae.update(
          //要更新的对象name，$isolated：隔离写入；防止对文档进行其他写入；
          {type:"number",$isolated:1},
          //$set:设置更新后的值；updated:是新添加的字段
          {$set:{type:"String",updated:true}},
          //upsert:表示如果没有于更新的请求匹配的文档，则不会创建新的文档，为true则创建；
          //multi:表示由多个文档与更新请求的查询匹配，则所有的文档都会更新，false：表示一个文档被更新
          //w:1 mongodb链接写入的关注级别
          {upsert:false,multi:true,w:1},
          function(err,results){
            //在集合中根据name：“keke”属性进行查找，返回err和查询结果
            nebulae.find({type:"String"},function(err,items){
              //toArray:遍历文档对象
              items.toArray(function(err,item){
                console.log(item);//
                db.close();//关闭链接
              })
            })
          }
        )
      })
    });
  })
})
