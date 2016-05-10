var mongoose = require('../helper/db');
var Schema = mongoose.Schema;   //  创建模型

var addressScheMa = new Schema({
  account: {type: String, index: true},//用户帐号
  buyerName: String,
  buyerAddress: String,
  buyerTel: String,
});

var address = module.exports = mongoose.model("addresses", addressScheMa);  //  与address集合关联 
