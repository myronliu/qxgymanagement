var mongoose = require('../helper/db');
var Schema = mongoose.Schema;   //  创建模型

var orderScheMa = new Schema({
  voucherId: {type: String, index: true},//订单号
  account: {type: String, index: true},//用户帐号
  shopId: {type: String, index: true},//商店ID
  shopName: {type: String, index: true},//商店名称
  productId: {type: String, index: true},
  productName: {type: String, index: true},
  productIcon: String,//商品图片
  unit: String,//单位
  price: String,//价格
  count: String,//数量
  amount: String,//金额
  status: String,//状态
  buyerName: String,//购买者姓名
  buyerAddress: String,//购买者地址
  buyerTel: String,//购买者电话
  createTime: String,//购买时间
  detail: String,//详情
  remarks: String//备注
});

var order = module.exports = mongoose.model("orders", orderScheMa);  //  与orders集合关联 
