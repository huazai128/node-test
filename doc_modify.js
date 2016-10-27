/*
findAndModify():只能更改单个文档对象；如果有其他进程最好不要使用
*/

var MongoClient = require('mongodb').MongoClient;//mongodbClient对象
MongoClient.connect("mongodb://localhost/",function(err,db){
  var myDb = db.db("astro");//创建新的数据库
  //根据集合名称获取集合相关信息
  myDb.collection("nebulae",function (err,nebulae) {
    //根据name：“keke”属性查找对象信息
    nebulae.find({name:"keke"},function(err,items){
      //toArray:遍历Cursor对象；是整个集合文件；是查询所有的数据在打印
      items.toArray(function(err,itemArr){
        console.log("==========");
        console.log(itemArr);
        //更新单个对象信息；
        nebulae.findAndModify(
          {name:"keke"},//根据属性name：keke更新信当前息
          [["name",1]],//[["name":1]]:看作是排序，1:代表升序；
          {$set:{name:"Super man","updated":true}},//更新后的数据，，并添加一个新的字段updated
          {w:1,new : true},//w：1表示启用写入关注，new：true表示在回调函数中返回修改后的数据，并在控制台输出；返回新修改的对象；
          function (err,doc) {//回调函数，返回修改后的数据信息
            console.log("After ...");
            console.log(doc);//打印数据
            db.close();//关闭链接
          }
        )
      })
    });
  })
})
