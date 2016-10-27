var express = require('express');
var cookieParser = require("cookie-parser");//cookie会话
var app = express();

//在所有路由中指定中间件
app.use(cookieParser());
app.get("/",function (req,res) {
  console.log(req.cookies);
  if(!req.cookies.hasVisited){//判断cookie中是否设置hasVisited；false表示没有设置cookie
    //req.cookie()：设置cookie;在响应中设置cookie
    res.cookie(
      "hasVisited",//设置cookie明知hasVisited
      "1",//设置cookie值
      {
        maxAge:60 * 60 * 1000,//设置缓存时间
        httpOnly:true,//为true，表示这个cookie只服务这个服务器访问，而不能通过客服端javascript访问
        path:"/"//cookie应用的路径
      }
    )
  }
  res.send("cookie");
})
app.listen(8081)
