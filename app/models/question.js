var mongoose = require('../helper/db');
var Schema = mongoose.Schema;   //  创建模型

var questionScheMa = new Schema({
  title: {type: String, index: true},
  votesingle: String,
  enable: String,
  sort: String,
  creater: String
});

var shop = module.exports = mongoose.model("questions", questionScheMa);  //  与shops集合关联 
