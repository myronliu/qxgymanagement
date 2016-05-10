var React = require('react');
var Layout = require('../../components/layout');
var ApiStore = require('../../helper/store');
var ApiAction = require('../../helper/action');
var UrlConfig = require('../../config/url');

module.exports = React.createClass({
  getInitialState: function(){
    return {
      pageTitle: "微信管理",
      site:"",
      location:"",
      startTime: "",
      endDate: ""
    };
  },
  apiSuccess: function(url,body){
    switch(url){
      case UrlConfig.setweixinmenu:
        console.log(body);
        //balabala...
        break;
      case UrlConfig.homeHeaders:
        //balabala....
        break;
      case UrlConfig.openFundAccount:
        window.to('/financing/buy');//示例跳转
        break;
    }
  },
  apiFail:function(url,status,message,body){
    // this.showLoading(false)
    if(status==1004||status==1088){//1004为用户在其他地方登录， 1088为用户升级未完成
      // TODO
    }else{
      // TODO
    }
  },
  componentDidMount: function(){
    //先注释掉
    ApiStore.addApiFun(this.apiSuccess.bind(this),this.apiFail.bind(this));
  },
  componentWillUnmount: function() {
    //先注释掉
    ApiStore.removeApiFun(this.apiSuccess.bind(this),this.apiFail.bind(this));
  },

  onClick: function() {
    var menus =
      {
        "button":[
          {  
            "type":"click",
            "name":"今日歌曲",
            "key":"V1001_TODAY_MUSIC"
          },
          {
          "name":"菜单",
          "sub_button":[
            {  
               "type":"view",
               "name":"搜索",
               "url":"http://www.soso.com/"
            },
            {
               "type":"view",
               "name":"视频",
               "url":"http://v.qq.com/"
            },
            {
               "type":"click",
               "name":"赞一下我们",
               "key":"V1001_GOOD"
            }
          ]}
        ]
      }
    // ApiAction.post(UrlConfig.client.setweixinmenu,menus);//发起请求
  },
  
  render: function() {
    return (
      <Layout captionText={"推广奖励发放明细"} currentPage="weixin">
        <div>
          <input type="button" className="btn btn-primary" value="查询"  onClick={this.onClick} />
        </div>
      </Layout>
    );
  }
})