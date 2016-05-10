/**
 * 管理后台配置信息（开发环境）
 * Created by Ray on 2015-09-13
 */
module.exports = {
  // 运营相关配置信息
  operation: require("./operation/development"),

  tokenKey: 'token',  // cookie token值
  loginUrl: "http://192.168.180.43:8109/uni-login/login",  // 登陆页面地址
  errorPage: "/error"
}