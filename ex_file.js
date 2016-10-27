/*
  sendfile():发送文件
*/
var express = require("express");
var url = require("url");
var app = express();
app.listen(8081);
//请求路径
app.get("/image",function (req,res,next) {
  //发送文件到页面sendfile(path,[options],callback);path:指定传输的路径，options：是一个对象
  res.sendFile(
    "admob-iphone.jpg",{
    maxAge:1,//24*60*60*1000,//最长限制内容
    root:"./"//当前文件所在的位置
  },function (err) {//文件传输完成后调用这个回调函数，接受一个错误
    if(err){//如果返回err存在就传输失败
      console.log("Error");
    }else{
      console.log("Success");
    }
  })
})
