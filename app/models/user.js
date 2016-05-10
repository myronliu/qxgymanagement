var mongoose = require('../helper/db');
var Schema = mongoose.Schema;   //  创建模型
var userScheMa = new Schema({
  account: {type: String, index: true},
  password: String,
  email: String,
  token: {type: String, index: true},
  time: String
}); //  定义了一个新的模型，但是此模式还未和users集合有关联

var user = module.exports = mongoose.model("users", userScheMa);//  与users集合关联
module.exports.createUser = function(newUser, callback){
  newUser.save(callback);
}