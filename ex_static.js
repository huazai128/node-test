var express = require('express');
var app = express();

//每一个中间件都是一个构造函数
//use()：是对所有的路由指定中间件  “／”是所有路径
//添加static中间件，是可以直接从磁盘对客服端提供静态文件服务，一般用于用于不改变文件传输
app.listen(8081);
//理由static来托管静态文件；静态文件包括css、js、image、html
app.use("/static",express.static("./static"),function (req,res) {

});//maxAge: 设置浏览器缓存最大时间；为一小时
app.use("/images",express.static("../images"));
