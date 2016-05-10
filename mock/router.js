var fs = require('fs');
var express = require('express');
var session = require('express-session');
var superagent = require('superagent');
var _ = require('underscore');
var router = express.Router();
var formidable = require('formidable');

var MUtil = require('./util');

router.use(function(req,res,next){
  console.log("----------get requrest from " + req.originalUrl);
  console.log("req.body: ");
  console.log(req.body);
  console.log();
  console.log("req.query: ");
  console.log(req.query);
  console.log();

  res.on("finish", function(){
    console.log("---------end requrest " + this.req.originalUrl);
    console.log();
  })

  res.on("error", function(){
    console.log("---------error: statusCode: " + this.statusCode + "; statusMessage: " + this.statusMessage);
    console.log();
  })

  next();
})

router.get('/',function(req,res){
  res.redirect('/promotion_activity');
})

router.post('/uni-login/login',function(req,res){
  res.json(MUtil.response());
})

router.post('/uni-login/auth',function(req,res){
  res.json(MUtil.response());
})

router.post('/privilege-api/menus',function(req,res){
  res.json(MUtil.response());
})

router.get('/blacklist',function(req,res){
  var _resp_data = MUtil.responseData('/blacklist');

  res.json(_resp_data);
})

router.post('/blacklist',function(req,res){
  res.json(MUtil.response());
})

router.delete('/blacklist',function(req,res){
  res.json(MUtil.response());
})

router.get('/promotion_activity/:id',function(req,res){
  var _resp_data = MUtil.responseData('/promotion_activity/:id');

  console.log(_resp_data);

  res.json(_resp_data);
})

router.get('/promotion_activity',function(req,res){
  var _resp_data = MUtil.responseData('/promotion_activity');

  res.json(_resp_data);
})

router.post('/promotion_activity',function(req,res){
  res.json(MUtil.response());
})

router.put('/promotion_activity',function(req,res){
  res.json(MUtil.response());
})

router.get('/promotion_activity_rule/:activity_id',function(req,res){
  var _resp_data = MUtil.responseData('/promotion_activity_rule/:activity_id');

  res.json(_resp_data);
})

router.post('/promotion_activity_rule',function(req,res){
  res.json(MUtil.response());
})

router.put('/promotion_activity_rule',function(req,res){
  res.json(MUtil.response());
})

router.delete('/promotion_activity_rule/:rule_id',function(req, res){
  res.json(MUtil.response());
})

router.post('/promotion_activity_workflow',function(req,res){
  res.json(MUtil.response());
})

router.post('/promotion_activity_audit',function(req,res){
  if(!req.body.auditorId){
    req.body.auditorId = Sys.getCurrentUserId(req);
  }

  res.json(MUtil.response());
})

router.get('/member_rewards',function(req,res){
  var _resp_data = MUtil.responseData('/member_rewards');
  
  res.json(_resp_data);
})

router.get('/rewards_detail',function(req,res){
  res.json(MUtil.response());
})

router.get('/rewards_summary',function(req,res){
  var _resp_data = MUtil.responseData('/rewards_summary');
  
  res.json(_resp_data);
})

router.get('/rewards_summary_detail',function(req,res){
  var _resp_data = MUtil.responseData('/rewards_summary_detail');
  
  res.json(_resp_data);
})

router.get('/promotion_relation',function(req,res){
  var _resp_data = MUtil.responseData('/promotion_relation');

  res.json(_resp_data);
})

router.post('/member/query-member',function(req,res){
  res.json(MUtil.response());
})

router.post('/message/pushMessage',function(req,res){
  res.json(MUtil.response());
})

router.post('/rewards_distribution',function(req,res){
  var form = new formidable.IncomingForm();
  
  form.parse(req, function(err, fields, files) {
    var _file_info = "";

    for(var key in files){
      var _f = files[key];

      if(_f){
        _file_info += "文件名：" + _f.name 
          + "; \r\n最后修改时间：" + _f.lastModifiedDate.toString() 
          + "; \r\n文件类型：" + _f.type 
          + "; \r\n文件大小：" + _f.size
          + "; \r\n文件路径：" + _f.path;

        if(fs.existsSync(_f.path)){
          fs.unlinkSync(_f.path);
        }
      }
    }

    console.log(_file_info);

    res.json(MUtil.response("文件上传成功！" + _file_info));
  });
})

router.get('/rewards_distributions',function(req,res){
  var _resp_data = MUtil.responseData('/rewards_distributions');

  console.log("_resp_data: ");
  console.log(_resp_data);

  res.json(_resp_data);
})

router.get('/rewards_distributions/:sn',function(req,res){
  var _resp_data = MUtil.responseData('/rewards_distributions/:sn');

  console.log("_resp_data: ");
  console.log(_resp_data);

  res.json(_resp_data);
})

router.post('/rewards_distribution_audit',function(req,res){
  res.json(MUtil.response());
})

router.get('/promotion_channels',function(req,res){
  var _resp_data = MUtil.responseData('/promotion_channels');

  console.log("_resp_data: ");
  console.log(_resp_data);

  res.json(_resp_data);
})

router.get('/promotion_channels_stat',function(req,res){
  var _resp_data = MUtil.responseData('/promotion_channels_stat');

  console.log("_resp_data: ");
  console.log(_resp_data);

  res.json(_resp_data);
})

router.get('/promotion_advs',function(req,res){
  var _resp_data = MUtil.responseData('/promotion_advs');

  console.log("_resp_data: ");
  console.log(_resp_data);

  res.json(_resp_data);
})


///新增推广渠道
router.post('/promotion_channel',function(req,res){
  res.json(MUtil.response());
})

///编辑推广渠道
router.put('/promotion_channel/:id',function(req,res){
  res.json(MUtil.response());
})

///删除推广渠道
router.delete('/promotion_channel/:id',function(req, res){
  res.json(MUtil.response());
})

router.get('/productType',function(req,res){
  var _resp_data = MUtil.getDbData('/productType', 'p2p');

  console.log("_resp_data: ");
  console.log(_resp_data);

  res.json(_resp_data);
})

router.get('/usersInfo',function(req,res){
  var _resp_data = MUtil.getDbData('/usersInfo', 'p2p');

  console.log("_resp_data: ");
  console.log(_resp_data);

  res.json(_resp_data);
})

router.post('/member/query-member',function(req,res){
  var _resp_data = MUtil.responseDbData('/member/query-member', 'kjt');

  console.log("_resp_data: ");
  console.log(_resp_data);

  res.json(_resp_data);
})


module.exports = router;