var mongoose = require('../helper/db');
var Schema = mongoose.Schema;   //  创建模型
var adminScheMa = new Schema({
  account: {type: String, index: true},
  password: String,
  email: String,
  token: {type: String, index: true},
  time: String
}); 

var admin = module.exports = mongoose.model("admins", adminScheMa);//  与admins集合关联
