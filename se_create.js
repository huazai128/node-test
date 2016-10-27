var mongoose = require("mongoose");
var db = mongoose.connect("mongodb://localhost/words");
var Words = require("./se_schema");//model
//以下都是Document对象进行操作
mongoose.connection.once("open",function () {
  //在Document对象添加数据
  var newWord = new Words({
    //word是必填字段
    word:"adada",
    fisrt:"g",last:"n",size:12,
    letters:["r","w","q","f","d","c","l","r"],
    stats:{vowels:5,consnants:7}
  });
  //save()；将Document对象中添加或修改的数据保存到数据库中
  newWord.save(function (err,doc) {
    console.log(doc+"====");
  })
  //isNew:返回的是一个boolean类型，是用来判断心随想是否已经存储在mongdb中，为true： 表示还没有把新对象存储到mongodb中
  console.log("Is Document new?" + newWord.isNew);//true
  //添加数据
  var newWord1 = {
    word:"keke",
    first:"k",
    last:"e",
    letters:["k",'e','k','e']
  }
  var newWord2 = {
    word:"mini",
    first:"m",
    last:'i',
    letters:['m','i','n','i'],
    stats:{vowels:3,consnants:5}
  }
  //利用model中使用create对象将数据添加到mongodb中；
  Words.create([newWord1,newWord2],function (err) {//create():将数据保存到数据库中，返回一个错误；

    for(var i = 1;i < arguments.length;i++){
      console.log(arguments[i]);
    }
    mongoose.disconnect();
  })
})
