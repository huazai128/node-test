var express = require("express");
var url = require("url");
var app = express();

app.listen(8082);
//默认的进入页面
app.get("/",function (req,res,next) {
  //默认请求发送
  res.send("Get index");
})
//当客服端请求／find
app.get("/find",function (req,res,next) {
  //获取请求参数
  var url_parts = url.parse(req.url,true)
  var query = url_parts.query;//解析url上的参数转换成对象
  var response = "Finding Book : Author "+query.author +" Title "+ query.title;
  console.log(" URL "+ req.originalUrl);//originalUrl():获取请求链接
  console.log(response);
  console.log(req);
  res.send(response+"==="+req)
});
//根据id请求数据
app.get("/user/:userId",function (req,res,next) {
  var id = req.params.userId;//获取请求参数id
  console.log("Url :"+req.originalUrl);
  console.log(id);
  res.send(id)//参数发送到页面上
})
//根据userId请求，先进入这个param()方法，获取请求参数的值
app.param("userId",function (req,res,next,value) {
  console.log(value+"====");
  next();//在执行get请求userId
})
