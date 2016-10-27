var express = require('express');
var bodyParser = require("body-parser");//处理POST请求正文JSON数据解析成req.body;
var session = require("express-session");//session会话
var cookieParser = require("cookie-parser");//发送和接收cookie
var crypto = require("crypto");//密码加密

//密码加密
function hashPW(pw) {
  return crypto.createHash("sha256").update(pw).digest("base64").toString();
}

var app = express();
//在所有路由中配置中间件
app.use(bodyParser());//用于处理POST请求正文JSON数据解析req.body属性
app.use(cookieParser("MERTstring"));//接收和发送cookie  ；里面的字符串是设置是防止cookie被窃取
app.use(session());//会话

//路由的配置
app.get("/rest",function (req,res) {
  if(req.session.user){
    res.send('<h2>'+req.session.success+'</h2>'+
      '<p>欢迎登录后台</p>'+
      '<a href="/logout">Logout</a>'
    )
  }else{
    req.session.error = "Access denited";
    res.redirect("/logout");
  }
})
//进入登录
app.get("/login",function (req,res) {
  var response = '<form method="POST">'+
    'username :<input type="text" name="username" /></br>'+
    'password :<input type="password" name="password" /></br>'+
    '<input type="submit" value="Submit" />'+
  '</form>';
  //判断用户是否登录
  if(req.session.user){
    res.redirect("/rest");
  }else if(req.session.error){//如果没有登录
    response += "<h2>"+req.session.error+"</h2>";
  }
  res.type("html")
  res.send(response);//响应到登录页面
})
//登录
app.post("/login",function (req,res) {
  //设置后台登录密码
  var user = {name:req.body.username,username:hashPW("huazai")};
  //判断登录密码和后台密码是否一致
  if(user.username === hashPW(req.body.password.toString())){
    //regenerate():重新在定义req.session对象；登录成功，设置session会话
    req.session.regenerate(function () {
      req.session.user = user;
      req.session.success =  "登录成功";
      res.redirect("/rest")
    })
  }else{
    req.session.regenerate(function () {
      req.session.error = "登录失败";
      //res.redirect("/rest");
    })
    res.redirect("/login");
  }
});
app.get("/logout",function (req,res) {
  //退出登录；删除会话中的session；也可以设置session的时间来删除
  req.session.destroy(function () {
    res.redirect("/login")
  })
})
app.listen(8081);
