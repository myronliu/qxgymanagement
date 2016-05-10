var mongoose = require('../helper/db');
var Schema = mongoose.Schema;   //  创建模型

var shopScheMa = new Schema({
  name: {type: String, index: true},
  shopBacksImg: String,
  shopAvatarImg: String,
  type: String,
  self: Boolean,
  estimation: String,
  shoper: String,
  tel: String,
  address: String,
  detail: String,
  status: String
});

var shop = module.exports = mongoose.model("shops", shopScheMa);  //  与shops集合关联 
