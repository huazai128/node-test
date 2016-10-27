var express = require("express");//引用express模块
var url = require("url");//引用url模块
var app = express();
app.listen(8081);
//get()方法请求路径，回调函数接受req，res
app.get("/find:?author=Keke&title=name",function (req,res) {
  var url_parts = url.parse(req.url,true);//utl.parse():获取链接参数
  var query = url_parts.query;//
  console.log(query.author);
  //send()传递参数到页面上
  res.send("Finding Book" + query.author+"===="+query.title);//把参数发送到页面中
})
