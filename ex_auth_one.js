/*
  HTTP身份验证的缺点：只要证书被存储，登录就一直存在，这样不安全
*/
var express = require('express');
var basicAuth = require("basic-auth-connect");//用于http身份验证
var app = express();

//单个路由验证
var auth = basicAuth(function(user,pass) {
  return (user === "keke" && pass === "123456");
})
app.get("/",function (req,res) {
  res.send("不要权限可以进入")
});
//在这个路由中添加单个用户验证;权限的添加可以在请求的时候添加到单个路由中
app.get("/admin",auth,function (req,res) {
  res.send("进入权限页面")
})
app.listen(8081);
