var express = require("express");
var bodyParser = require("body-parser");//用来处理POST请求正文JSON数据解析成req.body属性
var cookieParser = require("cookie-parser");//用来发送和存储cookie
var session = require("express-session")//express内置的实现会话和cookie－session有区别
var crypto = require("crypto");//crypto模块生成安全的密码来实现会话的验证；
function hashPW(pwd) {//是对密码进行加密；
  return crypto.createHash("sha256").update(pwd).digest("base64").toString();
}

var app = express();

//以下是在所有的路由当中指定中间件，这个在任何地方使用中间件
app.use(bodyParser());//用于处理POST请求正文JSON数据解析成req.body属性
app.use(cookieParser("MATRIstring"));//发送和接收cookie；定义的字符串是用来防止cookie被窃取
app.use(session())//会话，

//以下是路由的配置
//请求/rest判断用户是存在
app.get("/rest",function (req,res) {
  //判断session.user是否存在,存在表示用户已经登录
  if(req.session.user){
    res.send("<h1>"+req.session.success+"</h1>"+
      "<p>You have entered the rest section</p>"+
      "<a href='/logout'>logout</a>"
    );
  }else{
    //如果不存在表示用户没有登录
    req.session.error = "你还没有登录";
    res.redirect("/login");//重定向到登录页面
  }
});
//用户退出登录
app.get("/logout",function (req,res) {
  //session的方法destroy()：用于删除req.session对象
  req.session.destroy(function () {//req.session.destroy():删除req.session对象；一般用于用户退出登录
    res.redirect("/login")//重定向到登录页面
  })
})
//访问登录页面
app.get("/login",function (req,res) {
  var response = '<form method="POST">'+
    'username :<input type="text" name="username" /></br>'+
    'password :<input type="password" name="password" /></br>'+
    '<input type="submit" value="Submit" />'+
  '</form>';
  //判断用户是否登录
  if(req.session.user){
    //登录就重定向到rest页面
    res.redirect("/rest");
  }else if(req.session.error){//
    response += "<h2>"+req.session.error+"</h2>"//
  }
  res.type("html");//定义文件格式为html
  res.send(response);
})
//post请求登录
app.post("/login",function (req,res) {
  //设置登录账号和密码
  var user = {name:req.body.username,password:hashPW('myPass')};
  //如果用户登录密码和设置密码是否相等
  if(user.password ===  hashPW(req.body.password.toString())){
    //删除req.session对象并重新创建req.session对象
    req.session.regenerate(function () {
      req.session.user = user;//在req.session对象中添加user属性
      req.session.success = "Authenticated as "+ user.name;
      //重定向到／rest页面
      res.redirect("/rest")
    })
  }else{
    req.session.regenerate(function () {
      req.session.error = "登录失败";
      //res.redirect("/rest");
    })
    res.redirect("/login")
  }
})
app.listen(8081);
