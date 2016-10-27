var express = require('express');
var jade = require('jade');//引入jade模版
var ejs = require('ejs');//引入ejs模版
var app = express();
app.listen(8081);//设置端口

app.set("views","./view");//设置模版文件存储的位置

app.set("view engine",".jade")//设置模版引擎为jade
app.engine(".jade",jade.__express);//engine()方法用来出来模版扩展名注册模版引擎，__express只能在默认的文件扩展名上工作
app.engine(".html",ejs.renderFile);//以上都是注册模版扩展引擎，之外的模版引擎需要注册；一旦注册，引擎回调函数就会调用该扩展名的模版

//用来存储本地变量，locals对象可以即那个本地存储的数据映射到模版中，以变量属性名称调用获取中
//不能使用app.locals({});不支持这个语法了
app.locals.username = "keke";
app.locals.vehicle = "Jeep";
app.locals.terrain = "Mountains";
app.locals.climate = "Desert";
app.locals.location = "Unknown";

app.get("/",function (req,res,next) {
  res.redirect("/jade")//重定向到
})
app.get("/jade",function (req,res,next) {
  res.render("user");//render用于发送模版
})
app.get("/ejs",function (req,res,next) {
  res.render("ex_ejs.html",function (err,renderData) {
    res.send(renderData)
  })
})
