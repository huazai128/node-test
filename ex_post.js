/*
  中间件：body－parser：用于处理POST请求正文JSON数据解析成req.body属性
*/

var express = require('express');
var bodyParser = require("body-parser");//把POST请求正文中JSON数据解析成req.body属性
var app = express();
app.listen(8081)

//配置所有路由中指定中间件
app.use(bodyParser());//将所有路由指定bodyParser中间件；

//get提交路由的配置
app.get("/",function (req,res) {
  var response = '<form class="" action="/" method="post">'+
    'Frist: <input type="text" name="name" /></br>'+
    'Last:<input type="text" name="last" /></br>'+
    '<input type="submit" value="Submit" />'+
    '</form>';
  res.send(response)
});
//把POST的请求正文json数据解析成req.body属性，在调用字段
app.post("/",function (req,res) {
  var response = '<form class="" action="/" method="post">'+
    'Frist: <input type="text" name="name" /></br>'+
    'Last:<input type="text" name="last" /></br>'+
    '<input type="submit" value="Submit" />'+
    '</form>'+
    '<h1>Fisrt '+req.body.name+'</h1>'
    ;
    res.type("html");//type:传输文件的类型
    res.end(response);//请求结束，把结果发送出去
    console.log(req.body);//req.body可以或form表单输入的值
})
