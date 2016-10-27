var express = require('express');
var cookieParser = require("cookie-parser");//cookie发送和接受
var cookieSession = require("cookie-session");//session会话

var app = express();

//爱所有路由中设置cookie和session
app.use(cookieParser());
//secret:用来签署会话cookie的字符串，他是用来防止cookie被窃取;maxAge:缓存时间 httpOnly:只能在客服端请求下访问，不能在客服端javascript 访问
app.use(cookieSession({secret:"mysupersecret",maxAge: 60 * 60 * 1000,httpOnly:true}));//主要防止cookie被窃取



app.get("/name",function (req,res) {
  console.log(req.cookies);//
  if(req.session.test){//判断session中是否存在这个值
    //如果存在 就输出session中count值
    res.send("You are session" + req.session.count + "times");
  }else{
    res.send("Welcome to the lib")
  }
})
app.get("/lid",function (req,res) {
  req.session.test = true;//在session中定义一个值；
  if(!req.session.count){//如果session中不存在count值；
    req.session.count = 1;//就在session中定义count＝1
  }else{
    req.session.count += 1;//存在就加1
  }
  res.redirect("/name");//重定向到／name
})
app.listen(8081);
