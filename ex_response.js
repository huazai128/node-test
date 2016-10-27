var express = require("express");
var url = require("url");
var app = express();
app.listen(8084);
app.get("/",function (req,res,next) {
  var response = "<html><head><title>Simple Send</title></head>"+
    "<body><h1>Hello from express</h1></body></html>";
  res.status(200);//设置请求状态为200
  res.set({//设置Response
    "Content-Type":"text/html",
    "Content-Length":response.length
  });
  res.send(response);//发送到页面上
  console.log("Response finished :" + res.finished);//res.finished：判断发送是否成功
  console.log(res.headerSent);//res.headerSent：传输多少数据
});
//
app.get("/error",function (req,res,next) {
  res.status(400);//请求错误状态400
  res.send("This is a bad request");//
})
