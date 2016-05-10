/**
 * 信贷平台配置信息（准生产环境）
 * Created by Ray on 2015-09-13
 */
var _appName = "operation";

module.exports = {
  appName: _appName,
  contextPath: "/" + _appName, // 部署时应用上下文
    
  sys: {
    SESSION_SIZE: 100,  // session数据大小
    SESSION_DUR: 1000 * 60 * 5 // session过期时间(5分钟)
  },
  
  // 页面请求相关配置
  req: {
    requestTimeout: 15000,

    domains: {
      promotionApi: "http://10.255.12.17:8082/promotion", // 推广接口
      commonApi: "http://10.255.12.16:8081/common",  // 移动端中间层接口
      hryCxf: {  // 海融易Cxf接口
        member: "http://10.255.12.103:7011",
        p2p: "http://10.255.12.103:7012",
        operation: "http://10.255.12.103:7013"
      },
      guardian: {  // 守护者系统接口
        privilege: "http://10.255.6.22:8106", // 权限菜单接口
        uniAuth: "http://10.255.6.22:8108",  // 权限验证接口
        uniLogin: "http://10.255.4.20", // 登录接口
      },
      legacy: { // 遗留接口（后续可能逐渐弃用）
        p2pApi: "http://10.255.12.90:8084/api/services/hryApp" // 移动中间层p2p接口，这里主要给接口getHryUsersInfo使用
      }
    }
  },

  // 资源管理相关配置
  rc: {
    // 七牛云存储相关配置
    qiniu: {
      domain: "https://dn-hry-files-uat.qbox.me", // 域名
      conf: {
        ACCESS_KEY: "hn_oaWVfveNNJEF73L505oLf9Ivdmh6gKFLLQXmx",
        SECRET_KEY: "nqKvTlDfBhpfmCNc-XLYJlc1Ndv2CnIPtzd_1DoP",
        Bucket_Name: "hry-files-uat"  // 空间名
      },
      // 资源名前缀
      prefix: {
        OPER: "OP01-"  // 运营一期存储前缀
      }
    }
  }
}