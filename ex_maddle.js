/*
  自定义中间件
*/
var express = require('express');
var app = express();
function queryRemover(req,res,next) {
  console.log("URL");
  console.log(req.url);
  req.url = req.url.split("?")[0];
  console.log("After");
  console.log(req.url);
  next();
}
app.use(queryRemover);

app.get("/user/name",function (req,res) {
  res.send("test")
})
app.listen(8081);
