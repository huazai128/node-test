var mongoose = require("mongoose");
var Schema = mongoose.Schema;//定义结构化的模式集合文档

//创建一个Schema数据库模型
var schema = new Schema({
  //在数据库中定义字段
  word:{type:String,index:1,required:true,unique:true},//index：定义索引，required:必填，unipue：此字段是唯一的
  first:{type:String,index:1},
  last:String,
  size:Number,
  letters:[String],
  stats:{
    vowwls:Number,consnants:Number
  },
  charsets:[{type:String,chars:[String]}]
},{collection:"words_stats"});
//在schema中定义方法
schema.methods.startsWith = function (letters) {
  return this.first = letters;
}
//model:把模式转换成model，便于操作数据库
module.exports = mongoose.model("Words",schema);//编译模式
console.log(schema.indexes());
