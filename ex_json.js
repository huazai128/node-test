/*
  json和jsonp响应发送数据到页面上
*/
var express = require("express");//express模块
var app = express();
app.listen(8085);//设置端口号
app.get("/json",function (req,res,next) {
  app.set("json space",4);
  //json传输数据；传输到页面上进行展示
  res.json({
    name:"Smithsonian",built:"1846",items:"137M",
    center:["art","astrophysics","natural history","palnetary","keke",'mini']
  })
})
app.get("/error",function (req,res,next) {
  res.json(500,{status:false,message:"Internal Server Error"});
})
//jsonp:传输数据，文件格式也是json数据格式
app.get("/jsonp",function (req,res,next) {
  app.set("Jsonp callback name","cb");//
  res.jsonp({
    name:"Smithsonian",built:"1846",items:"137M",
    center:["art","astrophysics","natural history","palnetary","keke",'mini']
  })
})
