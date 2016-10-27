var express = require('express');
var basicAuth = require("basic-auth-connect");//用于HTTP身份验证
var app = express();


app.listen(8081);//端口号

//在所有路由中指定；在全局中进行身份验证
app.use(basicAuth(function (user,pass) {
  return (user === "keke" && pass === "123456");
}));
app.get("/",function (req,res) {
  res.send("Success");
})
