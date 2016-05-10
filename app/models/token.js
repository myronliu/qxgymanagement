var mongoose = require('../helper/db');
var Schema = mongoose.Schema;   //  创建模型

var tokenScheMa = new Schema({
  account: {type: String, index: true},//用户帐号
  token: {type: String, index: true},
  time: String
});

var token = module.exports = mongoose.model("tokens", tokenScheMa);  //  与orders集合关联 
