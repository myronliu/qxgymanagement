var Sys = {};

// 获取当前环境
Sys.getEnv = function(){
  return process.env.NODE_ENV || "development";
}

// 判断当前是否指定环境
Sys.isEnv = function(env){
  return (Sys.getEnv() === env);
}

Sys.getCurrentUserId = function(req){
	var _uid = "";

	if(!!req.cookies.userInfo){
		_uid = req.cookies.userInfo.id;
	}

	return _uid;
}

// 获取PageState(仅客户端执行) -- by Ray on 2015-11-28
Sys.getPageState = function(){
  return window.HManager || window._PAGESTATE || null;
}

// 判断当前模块是否为运营模块
Sys.isOperationModulePath = function(path){
  if(!path){
    return false;
  }

  var _path = path.toLowerCase();

  // 以operation开头，但非/channelstat,/rewarddetail,/rewardsummary页面
  if(_path.indexOf('/operation') === 0
    && _path.indexOf('/operation/channelstat') !== 0
    && _path.indexOf('/operation/rewarddetail') !== 0
    && _path.indexOf('/operation/rewardsummary') !== 0
  ){
    return true;
  }

  return false;
}

// 判断当前页面是否由Operation渲染
Sys.isOperationModuleContent = function(){
  var _pgState = Sys.getPageState();

  if(_pgState && _pgState.appName === "operation"){
    return true;
  }

  return false;
}

// 系统枚举
Sys.Enums = {};

Sys.Enums.PromotionPlatform = {
  "1": "快捷通", 
  "2": "海融易"
};

Sys.Enums.PromotionActionType = {
  "1": "注册", 
  "2": "实名认证", 
  "3": "绑定银行卡", 
  "4": "购买"
};

Sys.Enums.PromotionSource = {
  "1": "微信", 
  "2": "微博", 
  "3": "QQ", 
  "4": "短信", 
  "5": "邮件", 
  "6": "链接", 
  "7": "推广码"
};

Sys.Enums.PromotionRewardsType = {
  "1": "理财金",
  "2": "积分",
  "3": "抵扣券"
};

Sys.Enums.PromotionBatchRewardsStatus = {
  "1": "已提交",
  "2": "处理中",
  "3": "已完成",
  "4": "已作废"
};

Sys.Enums.PromotionRewardsStatus = {
  "1": "未同步",
  "2": "已同步",
  "3": "同步失败",
  "4": "不详"
};


module.exports = Sys;