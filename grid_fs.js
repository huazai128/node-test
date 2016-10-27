var MongoClient = require("mongodb").MongoClient;//引用mongoClient
var GridStore = require("mongodb").GridStore;//mongodb驱动程序提供了Grid和GridStore对象；是用来存储大型数据
var Grid = require("mongodb").Grid;//monogdb对象提供了Grid和GridStore对象
//链接数据库
MongoClient.connect("mongodb://localhost/",function (err,db) {
  //实例化Grid对象；接受一个db对象和要链接的＝数据库的集合words_stats
  var grid = new GridStore(db,"words_stats","w");
  var data = new Buffer("Hello World");//buffer():缓存一个数据
  console.log(data.toString());
  //put():将数据写入网格中
  grid.put(data,{_id:"test.file"},function (err,results) {
    console.log(results);
    //get():允许获取Grid返回的数据，get()：接受一个
    grid.get("test.file",function (err,data) {
      console.log(data.toString());
      //delete():删除Grid数据
      grid.delete("test.file",function (err,results) {
        console.log(results);
        db.close();
      })
    })
  })
})
