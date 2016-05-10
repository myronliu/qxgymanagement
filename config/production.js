/**
 * 管理后台配置信息（生产环境）
 * Created by Ray on 2015-09-13
 */
module.exports = {
  // 运营相关配置信息
  operation: require("./operation/production"),

  tokenKey: 'token',  // cookie token值
  loginUrl: "http://10.118.4.20/uni-login/login",  // 登陆页面地址
  errorPage: "/error"
}