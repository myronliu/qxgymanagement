var mongoose = require('../helper/db');
var Schema = mongoose.Schema;   //  创建模型

var productScheMa = new Schema({
  name: {type: String, index: true},//商品名称
  shopId: {type: String, index: true},//商店ID
  shopName: {type: String, index: true},//商店名称
  shopBacksImg: String,//商店背景图片
  shopAvatarImg: String,//商店头像
  shoper: String,//商店所有人姓名
  tel: String,//商店所有人的联系方式
  category: String,//产品的种类
  authorname: String,//创建者姓名
  unit: String,//单位
  price: String,//价格
  isvalid: String,//是否可用
  stock: String,//库存数量
  icon: String,//图标
  queue: String,//是否加入排队
  detail: String,//详情
  remarks: String//备注
});

var product = module.exports = mongoose.model("products", productScheMa);  //  与shops集合关联 
