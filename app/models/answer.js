var mongoose = require('../helper/db');
var Schema = mongoose.Schema;   //  创建模型

var answerScheMa = new Schema({
  questionid: {type: String, index: true},
  questiontitle: String,
  answer: String,
  author: String,
  vote: String
});

var answer = module.exports = mongoose.model("answers", answerScheMa);  //  与shops集合关联 
