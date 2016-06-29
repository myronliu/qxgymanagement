var mongoose = require('../helper/db');
var Schema = mongoose.Schema;   //  创建模型

var voteScheMa = new Schema({
  questionid: {type: String, index: true},
  answerid: {type: String, index: true},
  answer: String,
  author: String,
  voter: String
});

var vote = module.exports = mongoose.model("votes", voteScheMa);  //  与shops集合关联 
