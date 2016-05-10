/**
 * 信贷平台配置信息（开发环境）
 * Created by Ray on 2015-09-13
 */
var _appName = "operation";

module.exports = {
  appName: _appName,
  contextPath: "/" + _appName, // 部署时应用上下文
  
  // 系统参数
  sys: {
    SESSION_SIZE: 100,  // session数据大小
    SESSION_DUR: 1000 * 60 * 5 // session过期时间(5分钟)
  },

  // 页面请求相关配置
  req: {
    requestTimeout: 20000,
    // domains: {
    //   promotionApi: "http://10.255.12.17:8082/promotion", // 推广接口
    //   commonApi: "http://10.255.12.16:8081/common",  // 移动端中间层接口
    //   hryCxf: {  // 海融易Cxf接口
    //     member: "http://10.255.12.103:7011",
    //     p2p: "http://10.255.12.103:7012",
    //     operation: "http://10.255.12.103:7013"
    //   },
    //   guardian: {  // 守护者系统接口
    //     privilege: "http://192.168.180.44:8106", // 权限菜单接口
    //     uniAuth: "http://192.168.180.44:8108",  // 权限验证接口
    //     uniLogin: "http://192.168.180.43:8109", // 登录接口
    //   },
    //   legacy: { // 遗留接口（后续可能逐渐弃用）
    //     p2pApi: "http://10.255.12.90:8084/api/services/hryApp" // 移动中间层p2p接口，这里主要给接口getHryUsersInfo使用
    //   }
    // }
    domains: {
      promotionApi: "http://10.255.12.17:8082/promotion", // 推广接口
      //promotionApi: "http://192.168.2.120:7001/promotion", // 推广接口
      commonApi: "http://10.255.12.16:8081/common",  // 移动端中间层接口(准生产)
      // commonApi: "http://common-api.staging.lezhuan.corp",  // 移动端中间层接口(开发)
      hryCxf: {  // 海融易Cxf接口
        member: "http://192.168.2.120:7011",
        p2p: "http://192.168.2.120:7012",
        operation: "http://192.168.2.120:7013" // http://192.168.80.93:8080(测试地址)
      },
      guardian: {  // 守护者系统接口
        privilege: "http://192.168.180.44:8106", // 权限菜单接口
        uniAuth: "http://192.168.180.44:8108",  // 权限验证接口
        uniLogin: "http://192.168.180.43:8109", // 登录接口
      },
      legacy: { // 遗留接口（后续可能逐渐弃用）
        //p2pApi: "http://p2p.dev.lezhuan.io/api/services/hryApp"  // 移动中间层p2p接口，这里主要给接口getHryUsersInfo使用
           p2pApi: "http://10.255.12.90:8084/api/services/hryApp" // 移动中间层p2p接口，这里主要给接口getHryUsersInfo使用
      }
    }
  },

  // 资源管理相关配置
  rc: {
    // 七牛云存储相关配置
    qiniu: {
      domain: "http://7xoduz.dl1.z0.glb.clouddn.com", // 域名
      conf: {
        ACCESS_KEY: "hn_oaWVfveNNJEF73L505oLf9Ivdmh6gKFLLQXmx",
        SECRET_KEY: "nqKvTlDfBhpfmCNc-XLYJlc1Ndv2CnIPtzd_1DoP",
        Bucket_Name: "hry-files-dev"  // 空间名
      },
      // 资源名前缀
      prefix: {
        OPER: "OP01-"  // 运营一期存储前缀
      }
    }
  },

  // mock参数（开发测试中使用）
  mock: {
    enabled: false,
    
    // 用户权限信息，开发的时测试使用
    auth: {
      token: "392b0a0d363042cb8495f9487fe24c0e",
      user:{
        name: "管理员",
        loginName: "supper2"
      }
    },

    menus: [{
      key:"promotion",
      name: "推广管理",
        items: [{ 
            pageName: "activitylist",
            href: "/activity/list",
            title: "推广活动管理"
          }, { 
            pageName: "activityaudit",
            href: "/activity/audit",
            title: "审核推广活动"
          }, { 
            pageName: "searchrelation",
            href: "/operation/searchrelation",
            title: "查询推广关系"
          }, { 
            pageName: "memberreward",
            href: "/operation/memberreward",
            title: "查询会员推广奖励"
          }, { 
            pageName: "channelist",
            href: "/promotion/channelist",
            title: "推广渠道管理"
          }, { 
            pageName: "batchreward",
            href: "/promotion/batchreward",
            title: "手工发送推广奖励"
          }, { 
            pageName: "batchrewardreview",
            href: "/promotion/batchrewardreview",
            title: "手工发送奖励审核"
          }, {
            pageName: "batchrewardlist",
            href: "/promotion/batchrewardlist",
            title: "手工发送奖励查询"
          }, { 
            pageName: "advplacelist",
            href: "/promotion/advplacelist",
            title: "H5推广广告位管理"
          }
        ]
      }, {
        key:"riskctrl",
        name: "推广风控管理",
        items: [{ 
          pageName: "blacklistmanagement",
          href: "/riskmanagement/blacklistmanagement",
          title: "推广黑名单管理"
        }]
      }, {
        key:"settlement",
        name: "结算管理",
        items: [{ 
          pageName: "financialsum",
          href: "/operation/financialsum",
          title: "理财金发放数据汇总"
        },{
            pageName: "financialusesum",
            href: "/operation/financialusesum",
            title: "理财金使用数据汇总"
          },{
            pageName: "financialaccount",
            href: "/operation/financialaccount",
            title: "理财金账户管理"
          },{
            pageName: "financialrun",
            href: "/operation/financialrun",
            title: "运营活动数据汇总"
          },{
            pageName: "searchfinancial",
            href: "/operation/searchfinancial",
            title: "查询理财金"
          }
          ]
      },{
        key:"operation",
        name: "推广运营数据",
        items: [{ 
            pageName: "rewardsummary",
            href: "/operation/rewardsummary",
            title: "推广奖励发放汇总"
          }, {
            pageName: "channelstat",
            href: "/operation/channelstat",
            title: "推广渠道数据查询"
          }
        ]
      }, {
        key:"message",
        name: "消息推送",
        items: [{ 
            pageName: "messagepush",
            href: "/message/push",
            title: "消息推送"  
          }
        ]
      }, {
        key:"hrymanager",
        name: "海融易业务管理",
        items: [{ 
            pageName: "productRecommendation",
            href: "/hrybusiness/productRecommendation",
            title: "产品管理"  
          },{ 
            pageName: "adManagement",
            href: "/hrybusiness/adManagement",
            title: "广告管理"  
          },{ 
            pageName: "platformAnnouncement",
            href: "/hrybusiness/platformAnnouncement",
            title: "平台公告"  
          },{ 
            pageName: "newsManagement",
            href: "/hrybusiness/newsManagement",
            title: "媒体新闻"  
          },{
            pageName: "suggestion",
            href: "/operation/bizmgmt/suggestion",
            title: "用户吐槽"
          }
        ]
      }
    ]
  }
}