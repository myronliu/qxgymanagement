var React = require('react');
var EvoFlux = require('evoflux');

var Home = require('../pages/home');
var UserLogin = require('../pages/login');
var Dashboard = require('../pages/dashboard');
var WeixinMenus = require('../pages/weixin/menus');
var Audit = require('../pages/order/audit');
var ShopManage = require('../pages/shop/manage');
var ShopEdit = require('../pages/shop/register');
var ProductManage = require('../pages/product/manage');
var ProductEdit = require('../pages/product/edit');
var KechengManage = require('../pages/kecheng/manager');
var KechengAdd = require('../pages/kecheng/add');

var Error = React.createFactory(require('../pages/error'));

var reactBodyContainer = document.getElementById('react-body-container');

function _reactRender(cmpt, opts){
  opts = opts || {};

  React.render(cmpt, reactBodyContainer);
}

React.initializeTouchEvents(true);
var Router = EvoFlux.createRouter({
  '/': function(){
    _reactRender(<UserLogin fromUrl={this.query('fromUrl')}/>);
  },
  '/home': function(){
    _reactRender(<Home />);
  },
  '/error': function(){
    _reactRender(<Error />);
  },
  '/user/login': function(){
    _reactRender(<UserLogin fromUrl={this.query('fromUrl')}/>);
  },
  '/logout':function(){
    window.location.href='/logout';
  },
  '/dashboard': function(){
    _reactRender(<Dashboard />);
  },
  '/weixin': function(){
    _reactRender(<WeixinMenus />);
  },
  '/orderaudit': function(){
    _reactRender(<Audit id={this.query('id')}/>);
  },
  '/shopmanage': function(){
    _reactRender(<ShopManage />);
  },
  '/shopedit': function(){
    _reactRender(<ShopEdit id={this.query('id')}/>)
  },
  '/productmanage': function(){
    _reactRender(<ProductManage id={this.query('id')}/>);
  },
  '/productedit': function(){
    _reactRender(<ProductEdit id={this.query('id')} shopId={this.query('shopId')}/>)
  },
  '/kecheng': function(){
    _reactRender(<KechengManage />)
  },
  '/questionadd': function(){
    _reactRender(<KechengAdd id={this.query('id')} />)
  },
}).configure({html5history:true}).init();

window.to = function(url){return Router.setRoute(url);}

//handle href event.
//相对路径的url click 或者touch事件使用h5方式跳转。绝对路径的使用原生跳转(包含native url)。
//事件已经绑定了href，所以不管里面什么元素的点击都是往上冒泡到a元素运行这个链接。
var handLink = function(e) { 
  var el = e.target;
  var isLink = false;

  var hackLink = function(){
    var hrefValue = el.attributes.href.value
      if(hrefValue.search("://") === -1 
        && hrefValue.search("tel:") === -1
        && hrefValue.search("/res") === -1
        && hrefValue.search("/js") === -1
        && hrefValue.search("/laydate") === -1){
        Router.setRoute(hrefValue);
        e.preventDefault();
      }
  };

  if (el.nodeName != "A") {
    (function () {
      if (el.tagName != "A") {
        el = el.parentNode;
        if (el.tagName != "A") {
          arguments.callee();
        } else {
          isLink = true;
        }
      }
    })();
    if (isLink) {
      hackLink();
    }
  } else {
    hackLink();
  }
}

var links = document.links;

for (var i = 0; i < links.length; i++) {
  if(document.hasOwnProperty("ontouchend")){
    links[i].addEventListener('touchend', handLink,true);
  }else{
    // hackLink会造成日期控件无法弹出框，暂未找到原因，这里暂时注释hack功能
    // links[i].addEventListener('click', handLink, true);
  }
}; //下拉刷新的方式，需要重调用

module.exports = Router;