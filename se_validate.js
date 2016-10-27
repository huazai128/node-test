var mongoose = require('mongoose');
var db = mongoose.connect("mongodb://localhost/words");
var Words = require("./se_schema");
//Words.schema.path()：设置用于验证字段
Words.schema.path("word").validate(function (value) {//用于验证word字段的值，是否大于0；value就是保存的word字段的值
  return value.length > 0;//如果value大于0返回，错误信息就不会传入
},"Word is Too small");//错误信息提示字符串
Words.schema.path("word").validate(function (value) {//验证word字段的长度小于20
  return value.length < 20;
},"Word is Too Big")//错误信息提示字符串
mongoose.connection.once("open",function () {
  //添加数据对象
  var newWord = new Words({
    word:"indnadascslcslcnsdcnsdc",
    first:"i",
    last:"c",
    size:"indnadascslcslcnsdcnsdc".length
  })
  //保存到数据库中
  newWord.save(function (err) {
    //提示长度大于20
    console.log(err.errors.word.message);//验证函数时定义的字符串
    console.log(String(err.errors.word));//
    console.log(err.errors.word.type);//验证错误类型
    console.log(err.errors.word.path);//验证失败的对象路径
    console.log(err.errors.word.value);//验证失败的值
    console.log(err.name);//错误类型的名字
    console.log(err.message);//错误消息
    mongoose.disconnect();
  })
})
