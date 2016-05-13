var path = require('path');
var express = require('express');
var router = express.Router();
var React = require('react');
var mongoose = require('mongoose');
var Sys = require('../helper/sys');
var Converter = require('../helper/converter');

var ajax = require('../helper/ajax');
var CSVHelper = require('../helper/csv.js')
var Formater = require('../helper/formater.js')
var Mail = require('../helper/mail');

var MenusConfig = require('../config/menus');
var WeixinConfig = require('../config/weixin');
var qiniu = require('qiniu');
var token = require('token');
var md5 = require('md5');

var Admins = require('../models/admin');

var Users = require('../models/user');
var Shops = require('../models/shop');
var Products = require('../models/product');
var Orders = require('../models/order');
var Tokens = require('../models/token');
var Address = require('../models/address');


qiniu_conf_ACCESS_KEY = "hn_oaWVfveNNJEF73L505oLf9Ivdmh6gKFLLQXmx";
qiniu_conf_SECRET_KEY = "nqKvTlDfBhpfmCNc-XLYJlc1Ndv2CnIPtzd_1DoP";

// 设置formiable为全局变量（防止打包到客户端），分开打包也解决不了问题，
// 有疑问请联系刘毅    --- by Ray 2015-11-28
if(!global.formidable){
  formidable = require('formidable');
  global.formidable = formidable;
}

var apiP2PAddress = "http://p2p.dev.lezhuan.io/api/services/hryApp";
apiP2PAddress = "http://10.255.12.103:8084/api/services/hryApp";

var APP_ENV = Sys.getEnv();
if(APP_ENV != undefined){
  switch(APP_ENV){
    case "uat":
      apiP2PAddress = "http://10.255.12.90:8084/api/services/hryApp";
      break;
    case "production":
      // apiAddress = "http://10.118.12.5:8080/zhuanle";
      apiP2PAddress = "http://promotion.kjtpay.com/promotion";
      break;
    case "development":
      // apiPrivilegeAddress = "http://192.168.2.210:8106/";
  }
}

global.ajaxConfig = {url:"http://localhost:3009", header:{"Content-Type":"application/json"}};
global.ajaxConfigWeixin = {url:"https://api.weixin.qq.com/", header:{"Content-Type":"application/json"}};

var Error = React.createFactory(require('../pages/error'));
var Home = React.createFactory(require('../pages/home'));
var UserLogin = React.createFactory(require('../pages/login'));
var WeixinMenus = React.createFactory(require('../pages/weixin/menus'));
var Audit = React.createFactory(require('../pages/order/audit'));
var ShopManage = React.createFactory(require('../pages/shop/manage'));
var ShopEdit = React.createFactory(require('../pages/shop/register'));
var ProductManage = React.createFactory(require('../pages/product/manage'));
var ProductEdit = React.createFactory(require('../pages/product/edit'));

var GetWeixinToken = require('../actions/weixin/gettoken');
var WeixinTokenStore = require('../stores/weixin/gettokenstore');

if (typeof String.prototype.endsWith !== 'function') {
  String.prototype.endsWith = function(suffix) {
    return this.indexOf(suffix, this.length - suffix.length) !== -1;
  };
}

router.use(function(req,res,next){
  // console.log("req.body.token---------->");
  // console.log(req.body.token);
  if(req.url.endsWith('/shopregister')
    || req.url.endsWith('/getshops')
    || req.url.endsWith('/shopupdate')
    || req.url.endsWith('/getproducts')
    || req.url.endsWith('/getproductsbyids')
    || req.url.endsWith('/createproduct')
    || req.url.endsWith('/productupdate')
    || req.url.endsWith('/createorder')
    || req.url.endsWith('/getordersbytype')
    || req.url.endsWith('/orderupdate')
    || req.url.endsWith('/getaddress')
    || req.url.endsWith('/updateaddress')
  ){
    if(!req.body.token && !req.body.account)
    console.log(req.body.account)
    console.log(req.body.token)
    Users.findOne({account: req.body.account, token: req.body.token}, 
    function (err,results) {
      if(err){
        req.tokenExpired = true;
        return next();
      }else{
        if(results){
          var xd = parseInt(results.time ? results.time : 0) + 2 * 24 * 60 * 60 * 1000;
          if(xd >= (new Date()).getTime()){
            req.tokenExpired = false;
            Users.update({account: req.body.account, token: req.body.token}, {
              $set: {time: (new Date()).getTime()}
            }, function(err, result) {
              console.log("用户最后登录时间已经更新---------->")
              return next();
            });
          }else{
            req.tokenExpired = true;
            return next();
          }
        }else{
          req.tokenExpired = true;
          return next();
        }
      }
    });
  }else if(req.url.endsWith('/manger_getordersbytype')
    || req.url.endsWith('/manger_orderupdate')
    || req.url.endsWith('/manager_shopupdate')
    || req.url.endsWith('/manager_shopregister')
    || req.url.endsWith('/manger_getshops')
    || req.url.endsWith('/manager_getshopbyid')
    || req.url.endsWith('/manager_getproducts')
    || req.url.endsWith('/manager_createproduct')
    || req.url.endsWith('/manager_productupdate')
    || req.url.endsWith('/manager_getproduct')
    // || req.url.endsWith('/manager_shopregister')
  ){
    if(!req.body.token && !req.body.account)
    console.log(req.body.account)
    console.log(req.body.token)
    Admins.findOne({account: req.body.account, token: req.body.token}, 
    function (err,results) {
      if(err){
        req.tokenExpired = true;
        return next();
      }else{
        if(results){
          var xd = parseInt(results.time ? results.time : 0) + 2 * 24 * 60 * 60 * 1000;
          if(xd >= (new Date()).getTime()){
            req.tokenExpired = false;
            Admins.update({account: req.body.account, token: req.body.token}, {
              $set: {time: (new Date()).getTime()}
            }, function(err, result) {
              console.log("管理员最后登录时间已经更新---------->")
              return next();
            });
          }else{
            req.tokenExpired = true;
            return next();
          }
        }else{
          req.tokenExpired = true;
          return next();
        }
      }
    });
  }else{
    // if(req.url.endsWith('/error')
    // || req.url.endsWith('/logout')
    // || req.url.endsWith('/fonts/glyphicons-halflings-regular.eot')
    // || req.url.endsWith('.map')
    // || req.url.endsWith('.ico')
    // || req.url.endsWith('.css')
    // || req.url.endsWith('.js')
    // || req.url.endsWith('.woff2')
    // || req.url.endsWith('.woff')
    // || req.url.endsWith('.png')
    // || req.url.endsWith('.jpg')
    // || req.url.endsWith('.gif')
    // || req.url.endsWith('/getuser')
    // || req.url.endsWith('/userregister')
    // || req.url.endsWith('/userpwdreset')
    // || req.url.endsWith('/userupdate')
    // ){
    return next();
  // }else 
  }
});

// 统一页面渲染
function _renderPage(reactHtml, req, res, opts){
  var _opts = opts || {};
  var title = _opts.title || "后台管理";

  var _token = req.cookies.token || req.query._NETFINWORKSGUARDIAN_;

  function _innerRender(){
    res.render('index', {reactOutput: reactHtml, title: _opts.title, stateData: res.locals.state});
  }
  res.expose({ session: req.cookies.userInfo, page: { menus: MenusConfig.menus }});
  _innerRender();
}

router.get('/error', function(req,res){
  var reactHtml = React.renderToString(Error());

  _renderPage(reactHtml, req, res, { isMenu: false, title: "出错了" });
})

router.get(['/', '/user/login'],function(req,res){
  var reactHtml = React.renderToString(UserLogin({fromUrl: req.query.fromUrl}));
  _renderPage(reactHtml, req, res, { isMenu: false, title: "后台登录" });
})

router.get('/logout',function(req,res){
  res.cookie("account",null,{maxAge:0});
  res.cookie("token", null,{maxAge:0});
  
  return res.redirect('/user/login');
})

router.get('/home',function(req,res){
  var reactHtml = React.renderToString(Home());

  _renderPage(reactHtml, req, res, { title: "后台登录"});
})

// 订单管理
router.get('/orderaudit',function(req,res){
  var reactHtml = React.renderToString(Audit({id: req.query.id}));
  
  _renderPage(reactHtml, req, res, { title: "订单管理"});
})

// 商店管理
router.get('/shopmanage',function(req,res){
  var reactHtml = React.renderToString(ShopManage());
  
  _renderPage(reactHtml, req, res, { title: "商店管理"});
})

// 商店编辑
router.get('/shopedit',function(req,res){
  var reactHtml = React.renderToString(ShopEdit({id: req.query.id}));
  
  _renderPage(reactHtml, req, res, { title: "商店编辑"});
})

// 产品管理
router.get('/productmanage',function(req,res){
  var reactHtml = React.renderToString(ProductManage({id: req.query.id}));
  
  _renderPage(reactHtml, req, res, { title: "产品管理"});
})

// 产品编辑
router.get('/productedit',function(req,res){
  var reactHtml = React.renderToString(ProductEdit({id: req.query.id, shopId: req.query.shopId}));
  
  _renderPage(reactHtml, req, res, { title: "产品编辑"});
})

// 微信管理
router.get('/weixin',function(req,res){
  var reactHtml = React.renderToString(WeixinMenus());
  
  _renderPage(reactHtml, req, res, { title: "微信管理"});
})


//服务端需要用到的接口－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－＃

// 获取用户信息
router.post('/manger_getuser',function(req,res){
  console.log("---------->/manger_getuser")
  Admins.findOne({account: req.body.account, password: req.body.password}, 
    function (err,results) {
      if(err){
          console.log('error message',err);
          return res.json({status: -1, body:{}, err: err});
      }else{
        console.log('results',results);
        token.defaults.secret = 'qxgy';
        token.defaults.timeStep = 48 * 60 * 60; // 48h in seconds
        if(results){
          var newToken = token.generate(results.account + Math.ceil(Math.random()*1000000).toString());
          Admins.update({_id: results._id}, {
            $set: {token: newToken, time: (new Date()).getTime()}
          }, function(err) {
            if(err){
              return res.json({status: -1, body:{}, err: err});
            }else{
              results.token = newToken;
              results.password = "***";
              return res.json({status: 0, success: true, body:results});
            }
          });
          // return res.json({status: 0, body:results});
        }else{
          return res.json({status: -1, body:{}, err: "用户名或者密码错误"});
        }
      }
    });
})

// 根据状态获取订单信息，status： 0: 待接单； 1: 审核通过； 2: 配送中； 3: 完成； 4: 取消； 5: 失败；
router.post('/manger_getordersbytype',function(req,res){
  console.log("---------->/manger_getordersbytype")
  console.log(req.body.shopId)
  console.log(req.body.status)
  if(!req.tokenExpired){
    Orders.find({shopId: req.body.shopId, 'status':{$in:req.body.status}}, null, {sort: {'createTime':-1, 'voucherId':-1}}, 
      function (err,results) {
        if(err){
          console.log('error message',err);
          return res.json({status: -1, body:{}, err: err});
        }else{
          console.log('results',results);
          return res.json({status: 0, body:results});
        }
      }
    );
  }else{
    return res.json({status: -1, body:{}, err: "用户未登录或者登录过期"});
  }
})

//订单更新
router.post('/manger_orderupdate',function(req,res){
  console.log("---------->/manger_orderupdate")
  if(!req.tokenExpired){
    Orders.update({voucherId: req.body.voucherId}, {
        $set: {
          status: req.body.status
        }
    },  { multi: true }, function(err) {//更新多条
        if(err){
        return res.json({status: -1, body:{}, err: err});
      }else{
        return res.json({status: 0, success: true});
      }
    });
  }else{
    return res.json({status: -1, body:{}, err: "用户未登录或者登录过期"});
  }
})

// 获取所有商店信息
router.post('/manger_getshops',function(req,res){
  console.log("---------->/manger_getshops")
  if(!req.tokenExpired){
    Shops.find({},null, {sort: {'status':-1}}, function (err,results) {
      if(err){
        console.log('error message',err);
        return res.json({status: -1, body:{}, err: err});
      }else{
        console.log('results',results);
        return res.json({status: 0, body:results});
      }
    });
  }else{
    return res.json({status: -1, body:{}, err: "用户未登录或者登录过期"});
  }
})

//商店信息更新
router.post('/manager_shopupdate',function(req,res){
  console.log("---------->/manager_shopupdate")
  if(!req.tokenExpired){
    Shops.update({_id: req.body.id}, {
      $set: {
        name: req.body.name,
        shopBacksImg: req.body.shopBacksImg,
        shopAvatarImg: req.body.shopAvatarImg,
        type: req.body.type,
        self: req.body.self,
        shoper: req.body.shoper,
        tel: req.body.tel,
        address: req.body.address,
        detail: req.body.detail,
        status: req.body.status
      }
    }, function(err) {
      if(err){
        return res.json({status: -1, body:{}, err: err});
      }else{
        return res.json({status: 0, success: true});
      }
    });
  }else{
    return res.json({status: -1, body:{}, err: "用户未登录或者登录过期"});
  }
})

//商店注册
router.post('/manager_shopregister',function(req,res){
  console.log("---------->/manager_shopregister")
  if(!req.tokenExpired){
    var newShop = new Shops({
      name: req.body.name,
      shopBacksImg: req.body.shopBacksImg,
      shopAvatarImg: req.body.shopAvatarImg,
      type: req.body.type,
      self: req.body.self,
      shoper: req.body.shoper,
      tel: req.body.tel,
      address: req.body.address,
      detail: req.body.detail,
      status: 1//可用
    })
    newShop.save(function(err, shop){
      if(err){
        return res.json({status: -1, body:{}, err: err});
      }else{
        return res.json({status: 0, body:shop});
      }
    })
  }else{
    return res.json({status: -1, body:{}, err: "用户未登录或者登录过期"});
  }
})

//用户注册
router.post('/manager_getshopbyid',function(req,res){
  console.log("---------->/manager_getshopbyid")
  if(!req.tokenExpired){
    Shops.findOne({_id: req.body.id}, 
      function (err,result) {
        if(err){
          console.log('error message',err);
          return res.json({status: -1, body:{}, err: err});
        }else{
          return res.json({status: 0, body:result})
        }
      }
    );
  }else{
    return res.json({status: -1, body:{}, err: "用户未登录或者登录过期"});
  } 
})

// 根据商店id获取所有产品列表信息
router.post('/manager_getproducts',function(req,res){
  console.log("---------->/manager_getproducts")
  if(!req.tokenExpired){
    Products.find({shopId: req.body.shopId}, function (err,results) {
        if(err){
            console.log('error message',err);
            return res.json({status: -1, body:{}, err: err});
        }else{
          console.log('results',results);
          return res.json({status: 0, body:results});
        }
      });
  }else{
    return res.json({status: -1, body:{}, err: "用户未登录或者登录过期"});
  } 
})

// 根据商店获取所有产品列表信息
router.post('/manager_getproduct',function(req,res){
  console.log("---------->/getproducts")
  if(!req.tokenExpired){
    Products.findOne({_id: req.body.id}, function (err,results) {
        if(err){
            console.log('error message',err);
            return res.json({status: -1, body:{}, err: err});
        }else{
          console.log('results',results);
          return res.json({status: 0, body:results});
        }
      });
  }else{
    return res.json({status: -1, body:{}, err: "用户未登录或者登录过期"});
  } 
})

// 创建产品
router.post('/manager_createproduct',function(req,res){
  console.log("---------->/manager_createproduct")
  if(!req.tokenExpired){
    Shops.findOne({_id: req.body.shopId}, 
      function (err,result) {
        if(err){
          console.log('error message',err);
          return res.json({status: -1, body:{}, err: err});
        }else{
          if(result){
            var newProduct = new Products({
              name: req.body.name,
              shopId: req.body.shopId,
              shopName: result.name,
              shopBacksImg: result.shopBacksImg,
              shopAvatarImg: result.shopAvatarImg,
              shoper: result.shoper,
              tel: result.tel,
              category: req.body.category,
              authorname: req.body.authorname,
              unit: req.body.unit,
              price: req.body.price,
              isvalid: req.body.isvalid,
              stock: req.body.stock,
              icon: req.body.icon,
              queue: req.body.queue,
              detail: req.body.detail,
              remarks: req.body.remarks
            })
            newProduct.save(function(err, product){
              if(err){
                return res.json({status: -1, body:{}, err: err});
              }else{
                return res.json({status: 0, body:product});
              }
            })
          }else{
            return res.json({status: -1, body:{}, err: '找不到商店'})
          }
        }
      }
    );
  }else{
    return res.json({status: -1, body:{}, err: "用户未登录或者登录过期"});
  } 
})

//产品更新
router.post('/manager_productupdate',function(req,res){
  console.log("---------->/manager_productupdate");
  if(!req.tokenExpired){
    Products.update({_id: req.body.id, shopId: req.body.shopId}, {
        $set: {
          name: req.body.name,
          // shopName: req.body.shopName,
          // shopBacksImg: req.body.shopBacksImg,
          // shopAvatarImg: req.body.shopAvatarImg,
          // shoper: req.body.shoper,
          // tel: req.body.tel,
          category: req.body.category,
          authorname: req.body.authorname,
          unit: req.body.unit,
          price: req.body.price,
          isvalid: req.body.isvalid,
          stock: req.body.stock,
          icon: req.body.icon,
          queue: req.body.queue,
          detail: req.body.detail,
          remarks: req.body.remarks
        }
    }, function(err) {
        if(err){
        return res.json({status: -1, body:{}, err: err});
      }else{
        return res.json({status: 0, success: true});
      }
    });
  }else{
    return res.json({status: -1, body:{}, err: "用户未登录或者登录过期"});
  } 
})


// 客户端需要用到的接口－－－－－－－－－－－－－－－－－－－－－－－－＃

// 获取用户信息
router.post('/getuser',function(req,res){
  console.log("---------->/getuser")
  Users.findOne({account: req.body.account, password: req.body.password}, 
    function (err,results) {
      if(err){
          console.log('error message',err);
          var data = {error:err};
          return res.json({status: -1, body:{}, err: data});
      }else{
        console.log('results',results);
        token.defaults.secret = 'qxgy';
        token.defaults.timeStep = 48 * 60 * 60; // 48h in seconds
        if(results){
          var newToken = token.generate(results.account + Math.ceil(Math.random()*1000000).toString());
          Users.update({_id: results._id}, {
            $set: {token: newToken, time: (new Date()).getTime()}
          }, function(err) {
            if(err){
              return res.json({status: -1, body:{}, err: err});
            }else{
              results.token = newToken;
              results.password = "***";
              return res.json({status: 0, success: true, body:results});
            }
          });
          // return res.json({status: 0, body:results});
        }else{
          return res.json({status: -1, body:{}, err: "用户名或者密码错误"});
        }
      }
    });
})

//用户注册
router.post('/userregister',function(req,res){
  console.log("---------->/userregister")
  // console.log(req.body.name)

  Users.findOne({account: req.body.account, password: req.body.password}, 
    function (err,results) {
      if(err){
        console.log('error message',err);
        return res.json({status: -1, body:{}, err: err});
      }else{
        if(!results){
          token.defaults.secret = 'qxgy';
          token.defaults.timeStep = 48 * 60 * 60; // 48h in seconds
          var newUser = new Users({
            account: req.body.account,
            password: req.body.password,
            email: req.body.email,
            token: token.generate(req.body.account + Math.ceil(Math.random()*1000000).toString()),
            time: (new Date()).getTime()
          })
          Users.createUser(newUser, function(err, user){
            if(err){
              return res.json({status: -1, body:{}, err: err});
            }else{
              console.log("创建完用户之后，创建用户地址－－－－－－－－－－>")
              var address = new Address({
                account: req.body.account,
                buyerName: '',
                buyerAddress: '',
                buyerTel: ''
              })
              address.save(function(err, addr){
                if(err){
                  console.log("创建完用户之后，创建用户地址: 失败－－－－－－－－－－>")
                  return res.json({status: -1, body:{}, err: err});
                }else{
                  console.log("创建完用户之后，创建用户地址: 成功－－－－－－－－－－>")
                  console.log(addr)
                  return res.json({status: 0, body:user});
                }
              })
            }
          })
        }else{
          return res.json({status: -1, body:{}, err: "该帐号已经被注册"});
        }
      }
    }
  );
})

//用户重置密码
router.post('/userpwdreset',function(req,res){
  console.log("---------->/userpwdreset")
  var pwd = Math.ceil(Math.random()*10000000000).toString()
  Users.update({account: req.body.account, email: req.body.email}, {
      $set: {password:md5(pwd)}
  }, function(err, result) {
      if(err){
      return res.json({status: -1, body:{}, err: err});
    }else{
      // console.log("---------->/userpwdreset:result")
      // console.log(result)
      if(result.nModified == 0){
        return res.json({status: -1, body:{}, err: "用户名和邮箱不匹配"});
      }else{
        Mail.send(req.body.email, pwd, res);
      }
    }
  });
})

//用户修改密码
router.post('/userpwdupdate',function(req,res){
  console.log("---------->/userpwdupdate")
  Users.update({account: req.body.account, token: req.body.token, password: req.body.oldpwd}, {
      $set: {password:req.body.newpwd}
  }, function(err, result) {
      if(err){
      return res.json({status: -1, body:{}, err: err});
    }else{
      if(result.nModified == 0){
        return res.json({status: -1, body:{}, err: "更新失败，未找到该数据"});
      }else{
        return res.json({status: 0, success: true});
      }
    }
  });
})

//用户更新
router.post('/userupdate',function(req,res){
  console.log("---------->/userupdate")
  Users.update({_id: req.body.id}, {
      $set: {password:req.body.password}
  }, function(err) {
      if(err){
      return res.json({status: -1, body:{}, err: err});
    }else{
      return res.json({status: 0, success: true});
    }
  });
})

// 获取所有商店信息
router.post('/getshops',function(req,res){
  console.log("---------->/getshops")
  Shops.find({status: 1}, function (err,results) {
        if(err){
            console.log('error message',err);
            return res.json({status: -1, body:{}, err: err});
        }else{
          console.log('results',results);
          return res.json({status: 0, body:results});
        }
    });
})

// 根据商店获取所有产品列表信息
router.post('/getproducts',function(req,res){
  console.log("---------->/getproducts")
  Products.find({shopId: req.body.shopId, isvalid: 'Y'}, function (err,results) {
      if(err){
          console.log('error message',err);
          return res.json({status: -1, body:{}, err: err});
      }else{
        console.log('results',results);
        return res.json({status: 0, body:results});
      }
    });
})

// 根据商店获取所有产品列表信息
router.post('/getproductbyid',function(req,res){
  console.log("---------->/getproductbyid")
  Products.findOne({_id: req.body.id}, function (err,results) {
      if(err){
        console.log('error message',err);
        return res.json({status: -1, body:{}, err: err});
      }else{
        console.log('results',results);
        return res.json({status: 0, body:results});
      }
    });
})


// 根据id列表获取所有产品列表信息
router.post('/getproductsbyids',function(req,res){
  console.log("---------->/getproductsbyids");
  if(!req.tokenExpired){
    if(req.body.productlist.length == 0){
      return res.json({status: -1, body:{}, err: "未选中产品"});
    }else{
      console.log("解析productlist-------->")
      var ids = [];
      var list = req.body.productlist.split(',');
      for(var i=0; i < list.length; i++){
        console.log(list[i])
        ids.push(mongoose.Types.ObjectId(list[i]));
      }
      Products.find({'_id':{$in:ids}}, function (err,results) {
        if(err){
          console.log('error message',err);
          return res.json({status: -1, body:{}, err: err});
        }else{
          console.log('results',results);
          var result = {};
          result.list = results;
          if(!req.tokenExpired){
            Address.findOne({account: req.body.account}, 
              function (err,address) {
                if(err){
                  console.log('error message',err);
                  return res.json({status: -1, body:{}, err: err});
                }else{
                  if(address){
                    result.address = address;
                  }
                  return res.json({status: 0, success: true, body: result});
                }
              }
            );
          }
        }
      });
    }
  }else{
    return res.json({status: -1, body:{}, err: "用户未登录或者登录过期"});
  }
})


// 创建订单
router.post('/createorder',function(req,res){
  console.log("---------->/createorder");
  if(!req.tokenExpired){
    var ids = [];
    var products = {};
    var list = req.body.productlist.split(',');
    for(var i=0; i < list.length; i++){
      console.log(list[i]);
      var p = list[i].split(":");
      products[p[0]] = p[1];
      ids.push(mongoose.Types.ObjectId(list[i].substring(0, list[i].indexOf(':'))));
    }
    Products.find({'_id':{$in:ids}}, 
      function (err,results) {
        if(err){
            console.log('error message',err);
            return res.json({status: -1, body:{}, err: err});
        }else{
          console.log("------------>already get products")
          var arr = [];
          var voucherId = (new Date()).getTime() + Math.ceil(Math.random()*1000000).toString();
          var buyTime = (new Date()).getTime();
          for(var j=0; j < results.length; j++){
            var newOrder = new Orders({
              voucherId: voucherId,//订单号
              account: req.body.account,//
              shopId: results[j].shopId,//商店ID
              shopName: results[j].shopName,//商店名称
              productId: results[j]._id,
              productName: results[j].name,
              productIcon: results[j].icon,//商品图片
              unit: results[j].unit,//单位
              price: results[j].price,//价格
              count: products[results[j]._id],//数量
              amount: Formater.formatMoney(parseFloat(results[j].price) * parseInt(products[results[j]._id]), 2),//金额
              status: "0",//状态, 0: 待接单； 1: 审核通过； 2: 配送中； 3: 完成； 4: 取消； 5: 失败；
              buyerName: req.body.buyerName,//购买者姓名
              buyerAddress: req.body.buyerAddress,//购买者地址
              buyerTel: req.body.buyerTel,//购买者电话
              createTime: buyTime,//购买时间
              detail: req.body.detail,//详情
              remarks: req.body.remarks//备注
            })
            arr.push(newOrder);
          }
          Orders.insertMany(arr, function(err, docs) {
            if(err){
              console.log("------------>Orders insertMany error")
              return res.json({status: -1, body:{}, err: err});
            }else{
              console.log("------------>Orders insertMany success")
              // console.log(docs)

              Address.update({account: req.body.account}, {
                $set: {
                  buyerName: req.body.buyerName,
                  buyerAddress: req.body.buyerAddress,
                  buyerTel: req.body.buyerTel
                }
              }, function(err) {
                  if(err){
                  return res.json({status: -1, body:{}, err: err});
                }else{
                  console.log('------------->Address update')
                  return res.json({status: 0, success: true});
                }
              });
              // return res.json({status: 0, body:docs});
            }
          });
        }
      }
    );
  }else{
    return res.json({status: -1, body:{}, err: "用户未登录或者登录过期"});
  }
})

// 根据状态获取订单信息，status： 0: 待接单； 1: 审核通过； 2: 配送中； 3: 完成； 4: 取消； 5: 失败；
router.post('/getordersbytype',function(req,res){
  console.log("---------->/getordersbytype")
  console.log(req.body.account)
  console.log(req.body.status)
  if(!req.tokenExpired){
    Orders.find({account: req.body.account, 'status':{$in:req.body.status}}, null, {sort: {'createTime':-1}}, 
      function (err,results) {
        if(err){
          console.log('error message',err);
          return res.json({status: -1, body:{}, err: err});
        }else{
          console.log('results',results);
          return res.json({status: 0, body:results});
        }
      }
    );
  }else{
    return res.json({status: -1, body:{}, err: "用户未登录或者登录过期"});
  }
})

//订单更新
router.post('/orderupdate',function(req,res){
  console.log("---------->/orderupdate")
  if(!req.tokenExpired){
    Orders.update({voucherId: req.body.voucherId}, {
        $set: {
          status: req.body.status
        }
    },  { multi: true }, function(err) {//更新多条
        if(err){
        return res.json({status: -1, body:{}, err: err});
      }else{
        return res.json({status: 0, success: true});
      }
    });
  }else{
    return res.json({status: -1, body:{}, err: "用户未登录或者登录过期"});
  }
})

router.post('/getaddress',function(req,res){
  console.log("---------->/getaddress")
  // console.log(req.body.account)
  // console.log(req.body.status)
  if(!req.tokenExpired){
    Address.findOne({account: req.body.account}, 
      function (err,results) {
        if(err){
            console.log('error message',err);
            var data = {error:err};
            return res.json({status: -1, body:{}, err: data});
        }else{
          console.log('results',results);
          if(results){
                return res.json({status: 0, success: true, body:results});
          }else{
            return res.json({status: -1, body:{}, err: "该用户的地址不存在"});
          }
        }
      });
  }else{
    return res.json({status: -1, body:{}, err: "用户未登录或者登录过期"});
  }
})

// 更新收货地址
router.post('/updateaddress',function(req,res){
  console.log("---------->/updateaddress")
  if(!req.tokenExpired){
    Address.update({account: req.body.account}, {
      $set: {
        buyerName: req.body.buyerName,
        buyerAddress: req.body.buyerAddress,
        buyerTel: req.body.buyerTel
      }
    }, function(err) {
        if(err){
        return res.json({status: -1, body:{}, err: err});
      }else{
        return res.json({status: 0, success: true});
      }
    });
  }else{
    return res.json({status: -1, body:{}, err: "用户未登录或者登录过期"});
  }
})



module.exports = router;