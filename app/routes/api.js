var express = require('express');
var router = express.Router();
var ApiAction = require('../helper/action');
var UrlConfig = require('../config/url');
var WeixinTokenStore = require('../stores/weixin/gettokenstore');

//https://api.weixin.qq.com/cgi-bin/menu/create?access_token=ACCESS_TOKEN
router.post('/menu/create',function(req,res){
  var weixinToken = WeixinTokenStore.getItems();//将来把这一块提出去，只有在需要的时候才能调用
  console.log("weixinToken===========")
  console.log(weixinToken)
  if(!weixinToken || !weixinToken.expired_time || weixinToken.expired_time <= new Date().getTime()){
    GetWeixinToken.get(WeixinConfig.gettoken, function(data){
        data.expired_time = new Date().setSeconds(data.expires_in);
        WeixinTokenStore.saveData(data)
        ApiAction.post(UrlConfig.server.setweixinmenu+data.access_token,req.body,function(data){
          res.json(data);
        },global.ajaxConfigWeixin)
      });
  }else{
    console.log("UrlConfig.server.setweixinmenu+weixinToken------")
    console.log(UrlConfig.server.setweixinmenu+weixinToken.access_token)
    ApiAction.post(UrlConfig.server.setweixinmenu+weixinToken.access_token,req.body,function(data){
      console.log("================result from weixin")
      console.log(data)
      res.json(data);
    },global.ajaxConfigWeixin)
  }
  
})

router.post('*',function(req,res){
  ApiAction.post(req.url,req.body,function(data){
    res.json(data);
  },global.ajaxbalalalala)
})

router.get('*',function(req,res){
  ApiAction.get(req.url,function(data){
    res.json(data);
  },global.ajaxbalalalala)
})

module.exports = router;