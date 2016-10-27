/*
  获取请求对象中的属性和方法
*/
var express = require("express");
var app = express();
app.listen(8083);
app.get("/user/:userId",function (req,res,next) {
  console.log(req.originalUrl);//获取请求链接
  console.log(req.protocol);//获取请求协议此协议为http
  console.log(req.ip);//获取ip地址
  console.log(req.path);//获取请求路径
  console.log(req.host);//请求主机名
  console.log(req.method);//获取请求方法
  console.log(JSON.stringify(req.query));//获取请求url上链接参数转换成字符串
  console.log(req.fresh);//
  console.log(req.stale);
  console.log(req.secure);
  console.log(req.acceptsCharset("utf-8"));//
  console.log(req.get("connection"));//返回header值 keep－alive
  console.log(JSON.stringify(req.headers,null,2));//获取请求头相关信息
  res.send("Header");
})
