/*
  重定向响应
*/
var express = require('express');
var url = require('url');
var app = express();
app.listen(8081 )
app.get("/google",function (req,res,next) {
  res.redirect("http://baidu.com");//redirect：重定向到百度网站
});
app.get("/first",function (req,res,next) {
  res.redirect("/second");
})
app.get("/second",function (req,res,next) {
  res.send("Response from second");
})
app.get("/level/a",function (req,res,next) {
  res.redirect("../b");
})
app.get("/level/b",function (req,res,next) {
  res.send("from b")
})
